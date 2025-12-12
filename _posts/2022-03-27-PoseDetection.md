# Pose detection of humans using Camera 




| Category | Approach Description | Key Papers / Models | Pros | Cons |
|----------|----------------------|----------------------|------|------|
| Top-Down 2D Pose Estimation | Detect person → estimate keypoints inside each bounding box | OpenPose (2017), AlphaPose, HRNet (2019), SimpleBaseline | High accuracy, robust for single/multi-person | Slow for many people, depends on detector |
| Bottom-Up 2D Pose Estimation | Detect all keypoints globally → group into individuals | OpenPose PAF, Associative Embedding, DeepCut, HigherHRNet | Fast in crowds, no person detector needed | Grouping errors, slightly less accurate |
| Transformer-Based 2D Pose | Global joint reasoning using Vision Transformers | TokenPose, HRFormer, PETR, MViT-Pose | SOTA accuracy, long-range context | Computationally heavy |
| Monocular 3D Pose (Image → 3D Skeleton) | Predict 3D joints from a single RGB frame | VNect (2017), HMR, SPIN, METRO, CLIFF, PARE | No multi-view needed, real-time possible | Depth ambiguity, relies on priors |
| Video-Based 3D Pose (Temporal) | Use sequences (RNN/CNN/Transformers) for stable 3D pose | VIBE (2020), TCMR, TMR, MotionBERT, MixSTE | Smooth & stable, handles occlusion | Requires video stream |
| Model-Based Mesh Recovery | Predict full human mesh (SMPL) from a monocular RGB | HMR, SMPLify-X, SPIN, PARE, FrankMocap, ROMP | Full mesh output, good for animation | Complex, compute-heavy |
| Regression-Based Pose | Directly regress joint coordinates or heatmaps | DeepPose (Google) | Simple & fast | Lower accuracy today |
| Heatmap-Based Keypoints | Predict per-joint 2D heatmaps | Hourglass, CPN, HRNet | High accuracy, robust | More memory, extra post-processing |



GATs compute attention coefficients between nodes, allowing the model to focus on the most relevant neighbors when updating node embeddings.

✔️ Advantages

    Learns which neighbors matter most

    Works on graphs with varying degrees

    Multi-head attention improves stability

    Parallelizable (unlike RNN-based GNNs)

    No need for Laplacian eigenvectors

## 🎥 Related Video

<iframe width="560" height="315"
src="https://www.youtube.com/embed/XJyVrdXujX4"
title="Related YouTube Video"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>


| Model | Key Mechanism | Strengths | Weaknesses | Best For |
|------|----------------|-----------|------------|----------|
| **GCN** (Kipf & Welling, 2017) | Fixed normalized adjacency for message passing | Fast, simple | Treats all neighbors equally | Node classification, semi-supervised learning |
| **GraphSAGE** (2017) | Sampling + aggregation (mean, LSTM, pooling) | Handles large graphs | Aggregators may lose structure | Inductive learning on huge graphs |
| **GAT** (2018) | Attention-based neighbor weighting | Learns importance of neighbors | Slower on large/dense graphs | Social networks, molecules, citation networks |
| **Gated GNN / GGNN** (2016) | Gated recurrent updates | Captures sequential structure | Harder to train | Program analysis, chemistry |
| **Graph Transformer** (2020–) | Global self-attention | Handles long-range relations | Computationally heavy | Molecules, scene graphs, NLP-style tasks |



<div style="max-width:800px;margin:auto;padding:20px;">
<svg width="100%" height="380">
  <!-- Node Styles -->
  <style>
    .box { fill:#1e293b; stroke:#3b82f6; stroke-width:2; rx:8; }
    .title { fill:white; font-size:14px; font-weight:700; }
    .desc { fill:#cbd5e1; font-size:12px; }
    .edge { stroke:#94a3b8; stroke-width:2; marker-end:url(#arrow); }
  </style>

  <!-- Arrow Marker -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"></polygon>
    </marker>
  </defs>

  <!-- Boxes -->
  <g transform="translate(20,40)">
    <rect class="box" width="200" height="70"></rect>
    <text x="10" y="25" class="title">Input Graph</text>
    <text x="10" y="50" class="desc">Nodes + Edges with Features</text>
  </g>

  <g transform="translate(300,40)">
    <rect class="box" width="220" height="70"></rect>
    <text x="10" y="25" class="title">Linear Projection</text>
    <text x="10" y="50" class="desc">hᵢ → W hᵢ</text>
  </g>

  <g transform="translate(20,180)">
    <rect class="box" width="250" height="90"></rect>
    <text x="10" y="30" class="title">Attention Coefficients</text>
    <text x="10" y="55" class="desc">αᵢⱼ = softmax(aᵀ(W hᵢ || W hⱼ))</text>
  </g>

  <g transform="translate(330,180)">
    <rect class="box" width="200" height="90"></rect>
    <text x="10" y="30" class="title">Aggregation</text>
    <text x="10" y="55" class="desc">Σ αᵢⱼ W hⱼ</text>
  </g>

  <g transform="translate(600,110)">
    <rect class="box" width="180" height="90"></rect>
    <text x="10" y="35" class="title">Updated Node Embedding</text>
    <text x="10" y="60" class="desc">hᵢ′</text>
  </g>

  <!-- Arrows -->
  <line x1="220" y1="75" x2="300" y2="75" class="edge"/>
  <line x1="330" y1="75" x2="330" y2="180" class="edge"/>
  <line x1="150" y1="110" x2="150" y2="180" class="edge"/>
  <line x1="270" y1="225" x2="330" y2="225" class="edge"/>
  <line x1="530" y1="225" x2="600" y2="155" class="edge"/>
</svg>
</div>
