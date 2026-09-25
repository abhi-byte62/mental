"""
Unit tests for MindBridge User Authentication and Demo Persona switching.
"""

import unittest
from fastapi.testclient import TestClient
from backend.main import app


class TestAuthEndpoints(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)

    def test_get_demo_users(self):
        res = self.client.get("/api/auth/demo-users")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 3)
        usernames = [u["username"] for u in data]
        self.assertIn("child_demo", usernames)
        self.assertIn("guardian_demo", usernames)
        self.assertIn("teacher_demo", usernames)

    def test_demo_login_child(self):
        res = self.client.post("/api/auth/demo-login", json={"username": "child_demo"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("token", data)
        self.assertEqual(data["user"]["role"], "child")
        self.assertEqual(data["user"]["username"], "child_demo")

    def test_demo_login_guardian(self):
        res = self.client.post("/api/auth/demo-login", json={"username": "guardian_demo"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["user"]["role"], "guardian")

    def test_register_and_login_custom_user(self):
        import uuid
        unique_user = f"child_{uuid.uuid4().hex[:8]}"
        payload = {
            "username": unique_user,
            "name": "Test Child",
            "password": "password123",
            "role": "child",
            "child_age": 10,
            "grade": "Grade 5",
            "avatar": "🎒"
        }
        res = self.client.post("/api/auth/register", json=payload)
        self.assertEqual(res.status_code, 200)
        reg_data = res.json()
        self.assertEqual(reg_data["user"]["username"], unique_user)

        # Login with credentials
        login_res = self.client.post("/api/auth/login", json={
            "username": unique_user,
            "password": "password123"
        })
        self.assertEqual(login_res.status_code, 200)
        login_data = login_res.json()
        self.assertIn("token", login_data)
        self.assertEqual(login_data["user"]["name"], "Test Child")


if __name__ == "__main__":
    unittest.main()
