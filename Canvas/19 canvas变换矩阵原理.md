# 变换矩阵

平移 translate()、缩放 scale() 和旋转 rotate() 这 3 种方法在本质上是用变换矩阵 transform()
方法来实现的。也就是说，我们仅通过 transform() 方法就可以实现平移、缩放和旋转这 3 种操作。

## 语法

```javascript
cxt.transform(a,b,c,d,e,f);
```

> a ：水平缩放绘图
>
> b ：水平倾斜绘图
>
> c ：垂直倾斜绘图
>
> d ：垂直缩放绘图
>
> e ：水平移动绘图
>
> f ：垂直移动绘图

## 原理

原理是很简单的线性代数的矩阵乘法

设置开始坐标系为(x1, y1), 经过变换后得到 (x2, y2)

```javascript
	  [a, c, e]
令矩阵A = [b, d, f]
	  [0, 0, 1]

  [x2]	     [x1]
则[y2] = A * [y1]
  [c ]	     [1]

则有:
x2 = a*x1 + c*y1 + e
y2 = b*x1 + d*y1 + f
c = 1

矩阵乘法原则是:
· 只有左矩阵的列数与右矩阵的行数相同的两个矩阵才能相乘.
· 乘积矩阵第i行第j列处的元素等于左矩阵的第i行与右矩阵的第j列对应元素乘积之和.
· 乘积矩阵的行数等于左矩阵的行数，列数等于右矩阵的列数.

c舍去, 我们只看x2,y2
```

## 实现平移

由于:

> x2 = a*x1 + c*y1 + e
> y2 = b*x1 + d*y1 + f

对于点(x1, y1)平移到点(x2, y2), 那么应该有:

> x2 = x1 + ?
> y2 = y1 + ?

则令:

> a=d=1
> c=b=0
> e即为x轴平移距离, f为y轴平移距离

即:

> x2 = 1 * x1 + 0 * y1 + e
> x2 = x1 + e

> y2 = 0 * x1 + 1 * y1 + f
> y2 = y1 + f

即

```javascript
ctx.transform(1, 0, 0, 1, e, f)
```

## 实现缩放

由于:

> x2 = a*x1 + c*y1 + e
> y2 = b*x1 + d*y1 + f

对于(x1, y1)缩放后到(x2, y2), 有:

> x2 = n*x1
> y2 = n*y2

则令:

> c = e = b = f = 0

则

> x2 = a*x1
> y2 = d*y1

即

```javascript
ctx.transform(a, 0, 0, d, 0, 0)
```

## 实现旋转

假设图形开始坐标为（x1，y1），旋转后的坐标为（x2，y2），图形旋转的角度为 θ，那么就有
以下公式:

> x2 = x1 * cosθ - y1 * sinθ;
> y2 = x1 * sinθ + y1 * cosθ;

由于:

> x 2 = a * x1 + c * y1 + e
> y2 = b * x1 + d * y1 + f

则令

> e = f = 0
> a = cosθ
> b = sinθ
> c = -sinθ
> d = cosθ

即

```javascript
ctx.transform(cosθ, sinθ,- sinθ, cosθ, 0, 0)
```


## transform与setTransform的区别

区别就是transform会在上一次的基础上变换原点与坐标系旋转角度

而setTransform则每次都从w3c坐标系的基础上也就是最原始的坐标

> 这意味着混合使用先transform顺时针30度再使用setTransform顺时针旋转30度, 当前绘制的话, 其实只在w3c坐标系的基础上旋转了30度,
>
> 但是使用两个transform分别顺时针旋转30度则在w3c坐标系的基础上旋转了60度
