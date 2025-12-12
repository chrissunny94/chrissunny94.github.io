
## Comparison of Visual SLAM


# 🎯 Visual Monocular SLAM Comparison

| Method       | Approach            | Map Type       | Loop Closure | Speed        | Notes |
|-------------|-------------------|---------------|--------------|-------------|-------|
| **ORB-SLAM3 (Mono)** | Feature-based     | Sparse        | ✅ Yes       | Medium      | State-of-the-art, robust, supports large-scale mapping |
| **ORB-SLAM2** | Feature-based     | Sparse        | ✅ Yes       | Medium      | Widely used, reliable for small to medium environments |
| **REBVO**     | Edge / Semi-direct VO | Sparse     | ❌ No        | ⚡ Fast     | Lightweight odometry, drift over time, good for embedded devices |
| **LSD-SLAM**  | Direct            | Semi-dense    | ✅ Yes       | Medium      | Semi-dense map, works in low-texture scenes |
| **DSO**       | Direct Sparse     | Sparse        | ❌ No        | Medium      | High precision, sensitive to lighting changes |
| **SVO**       | Semi-direct       | Sparse        | ❌ No        | ⚡ Fast     | Minimal computational cost, real-time tracking |
| **PTAM**      | Feature-based     | Sparse        | Partial      | Medium      | Classic method, separates tracking & mapping, mostly for research |

### Legend
- ✅ Loop closure supported  
- ❌ Loop closure not supported  
- ⚡ Fast / real-time oriented  

**Key Takeaways:**
- 🟢 For **accurate mapping & loop closure:** ORB-SLAM2/3  
- 🟡 For **lightweight odometry:** REBVO, SVO  
- 🔵 For **semi-dense or research exploration:** LSD-SLAM, DSO, PTAM  


## 🔥 Curated Video Resources

Here are several useful YouTube tutorials and demos relevant to autonomous perception, computer vision, robotics, and depth understanding.

### 📹 Video 1  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/nYBXOieDUOg"  
title="Video 1" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 2  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/P0ghKIdzdvM"  
title="Video 2" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 3  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/o_6C5qUjxls"  
title="Video 3" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 4  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/GKVuSe6gOT0"  
title="Video 4" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 5  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/Y-iRTSxO4gc"  
title="Video 5" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 6  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/K3s1RQcnXhE"  
title="Video 6" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>

---

### 📹 Video 7  
<iframe width="560" height="315"  
src="https://www.youtube.com/embed/rUmhGIiT7RQ"  
title="Video 7" frameborder="0"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
allowfullscreen></iframe>
