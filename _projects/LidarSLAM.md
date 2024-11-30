---
layout: page
title: Lidar SLAM
description: a project with a background image
img: assets/blog/1/kiss_icp_demo.gif
importance: 1
category: SLAM
related_publications: 
---


Hello , this is a blog about comparison of different aproaches to perform SLAM on 3D data .


<iframe width="560" height="315" src="https://www.youtube.com/embed/play2qTJhGY?si=J9ThxtExD5KRLO_H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


- LOAM

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/1/LOAM.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

- FLOAM

This work is an optimized version of A-LOAM and LOAM with the computational cost reduced by up to 3 times. This code is modified from LOAM and A-LOAM .

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/1/image.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

- HDL_GRAPH_SLAM




<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/1/hdl_graph_SLAM.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


- KISS_ICP

<div class="caption">
    This image can also have a caption. It's like magic.
</div>


Our odometry estimation approach relies on point-to-point ICP combined with adaptive thresholding
for correspondence matching, a robust kernel, a simple but
widely applicable motion compensation approach, and a point
cloud subsampling strategy. This yields a system with only a few
parameters that in most cases do not even have to be tuned
to a specific






















---------------------------------------------------------------------------------------------------------------------------






