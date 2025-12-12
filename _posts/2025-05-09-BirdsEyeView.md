## Multimodal BEV sensor perception 



# BEV Perception Comparison

## VAD (Voxel-based Detection End-to-End Vectorized Autonomous Driving via Probabilistic Planning)
![VAD](/images/BEV_PERCEPTION/vad.png)

## PPGeo (Policy Pre-training for Autonomous Driving via Self-supervised Geometric Modeling)
![PPGeo](/images/BEV_PERCEPTION/ppgeo.PNG)

## BEV Detection
![BEV Detection](/images/BEV_PERCEPTION/bev_det.png)

## BEV Fusion
![BEV Fusion](/images/BEV_PERCEPTION/bevfusion.jpg)

# Comparison of VAD, PPGeo, BEV Detection, and BEV Fusion

| Feature / Aspect         | VAD (Voxel-based Detection)          | PPGeo (Point-Pillar + Geometry)           | BEV Detection (Bird’s Eye View)       | BEV Fusion (Multi-Modal BEV Fusion)      |
|--------------------------|------------------------------------|------------------------------------------|--------------------------------------|-----------------------------------------|
| **Input Type**           | 3D voxels from LiDAR point cloud   | Point clouds projected onto pillars      | BEV projected images or LiDAR points | Multi-modal: LiDAR + camera + radar     |
| **Representation**       | 3D voxel grid                      | 2D pseudo-image (pillar features)       | 2D BEV feature map                    | 2D BEV feature map with fused modalities|
| **Computational Cost**   | High (3D convolutions)             | Moderate (2D convolutions)              | Low to moderate (2D CNN)             | High (fusion + multi-modal processing) |
| **Spatial Resolution**   | Good 3D spatial accuracy           | Limited by pillar size                  | Good horizontal resolution, limited vertical | High overall, retains vertical + semantic info |
| **Detection Performance**| Strong for dense point clouds      | Efficient and competitive                | Efficient, good for overhead view    | Best accuracy, robust to occlusion     |
| **Use Cases**            | 3D object detection in LiDAR       | Real-time LiDAR detection                | Autonomous driving, traffic analysis | Autonomous driving, robust multi-sensor perception |
| **Pros**                 | Accurate 3D localization           | Fast, lightweight                        | Easy to integrate with planning       | Robust, handles occlusion and multi-modal info |
| **Cons**                 | Computationally heavy              | Loss of fine 3D detail                    | Limited vertical info                  | More complex, high compute requirements |
