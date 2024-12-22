---
layout: page
title: Temporal Networks
description: How to deal with temporal information in machine learning
img: assets/blog/temporal_networks/human-pose-estimation-deep-learning.gif
importance: 1
category: AIML
related_publications: 
---

## Graph Convolution Networks (GCNs) for Temporal Data

Graph Convolutional Networks (GCNs) have become essential in handling temporal data, particularly in applications such as human pose estimation and spatio-temporal feature extraction. By combining the ability to capture both spatial and temporal dependencies, GCNs enable powerful modeling of dynamic data over time.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/temporal_networks/Graph_attention_spation_temporal_network.png" title="Graph Attention Spatio-Temporal Network" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The **Graph Attention Block** is crucial in effectively expressing the hierarchical and symmetrical structure of human poses, allowing for adaptive extraction of global semantic information over time. By focusing on both local and global spatial blocks interleaved with temporal blocks, GCNs can fuse spatio-temporal features from sequences of 2D keypoints, enhancing the learning of temporal dynamics in video data or sequential data from sensors.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/temporal_networks/GAST.png" title="Graph Attention Spatio-Temporal Block" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Video Demonstration
<iframe width="560" height="315" src="https://www.youtube.com/embed/XJyVrdXujX4?si=FBkNbC0L4nO_Yvwb" title="Graph Attention Spatio-Temporal Network Demonstration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The ability of GCNs to adaptively fuse spatial and temporal features makes them ideal for tasks such as human pose tracking, motion recognition, and other time-series predictions.

---

## Vision Transformers (ViTs)

Vision Transformers (ViTs) have gained popularity for their effectiveness in processing spatial-temporal information. Unlike traditional CNNs, ViTs treat image patches as sequences, enabling them to capture long-range dependencies and perform well in tasks like video classification and sequence modeling.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/temporal_networks/ViT.jpg" title="Vision Transformer Model" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

ViTs have shown significant success in integrating temporal dynamics, offering a new approach to handling video data compared to CNN-based architectures.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/temporal_networks/ViT.gif" title="Vision Transformer in Action" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

By leveraging these advanced architectures, we can build models that not only understand spatial structures but also learn the temporal dependencies within data, making them ideal for applications like video analysis, human motion tracking, and predictive modeling in dynamic environments.

