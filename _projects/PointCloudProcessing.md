---
layout: page
title: POINT CLOUD PROCESSING
description: How to get started on PointCloud 
img: assets/blog/3/lgsvldemo.gif
importance: 1
category: PCL
related_publications: 
---


In this blog i am going to go about how to start working on Pointcloud Data .

To start off with PCL , you need to understand some basic Datastructures and what it represents .

- Pointcloud 
- Voxel 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/3/PointvsVoxel.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>





Clustering algorithms

- Hungarian 
- Eucledian


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/3/polygonization_teaser.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



Another objective of Pointcloud processing is being able to filter out Ground plane and Whatever is above .


- It was observed that the ground plane is primarily flat, which suggested that a plane fitting algorithm like RANSAC can be used to remove the ground plane points.
    
- Furthermore, the point cloud contained a significant amount of noise points (as can be seen in the image below) that are situated far outside the standard point cloud data.

RANSAC works by randomly selecting a subset of points and fitting a model to the subset. The model is then evaluated to determine how well it fits the data. The model with the best fit is selected as the best model. This process is repeated a number of times to find the best model.


We have 2 main ways to process point clouds with Deep Learning: 

    point based (direct processing) 

    voxel based (voxelization, then convolutions)