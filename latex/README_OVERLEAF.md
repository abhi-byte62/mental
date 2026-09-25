# MindBridge IEEE Research Paper (Overleaf Ready Package)

This directory contains the publication-grade IEEE Conference formatted research paper for **MindBridge**.

## 📁 File Structure

- **`main.tex`**: The primary LaTeX document formatted using the official IEEE conference template (`IEEEtran.cls`), containing:
  - Complete author and affiliation blocks (Harsha R, Arjun M, Abhishek MR, Prof. Jetti Satya Sai Kumar, Presidency University).
  - Formal mathematical modeling (composite risk formula, clipping, Gaussian noise, discrete thresholding).
  - Algorithmic specification (Algorithm 1: Dual-Modality Inference & Ephemeral Parsing).
  - High-density academic tables (Gaps, Classification Metrics, Verification Suite).
  - Full system architecture, data flow diagrams, and implementation Gantt chart.
  - Ethical and regulatory compliance analysis under Section 9 of India's DPDP Act, 2023.
- **`references.bib`**: BibTeX database with 16 peer-reviewed citations and national policy reports (WHO, MMWR, JMIR, JCPP, AAAI, NIMHANS, MeitY).
- **`figures/`**: High-resolution diagrams:
  - `system_architecture.png` (5-Tier Architecture)
  - `data_flow_diagram.png` (End-to-End Data Pipeline)
  - `mental_health_project_gantt_chart.png` (Multi-Phase Project Timeline)

---

## 🚀 How to Open in Overleaf

### Option A: Upload ZIP (Fastest - 10 seconds)
1. Go to [Overleaf.com](https://www.overleaf.com/).
2. Click **New Project** $\rightarrow$ **Upload Project**.
3. Select `MindBridge_Research_Paper_Overleaf.zip` located in the root directory.
4. Click **Recompile** — it will build immediately without errors!

### Option B: Copy Files Manually
1. In Overleaf, create a **Blank Project**.
2. Upload the `figures/` folder.
3. Paste the contents of `references.bib` into a new `references.bib` file.
4. Paste the contents of `main.tex` into `main.tex`.
5. Click **Recompile**.
