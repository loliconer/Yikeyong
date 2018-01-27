# 网站图片的优化

1. 使用相对尺寸，保证不会溢出父元素
    ```css
    img, embed, object, video {
      max-width: 100%;
    }
    ```
2. 为img元素的提供有意义的alt属性描述，以提高网站的可用性
3. 高DPI设备使用srcset增强img
    ```html
    <img src="photo.png" srcset="photo@2x.png 2x">
    ```
支持  srcset 的话，逗号分隔的图片/条件列表会先于任何请求发出前分析，然后只有最合适的图片被下载然后显示。虽说条件可以包含从像素密度到宽度和高度的种种，但目前只有像素密度的支持度最好。为平衡现在的行为和未来的特性，在属性中请还是继续只提供 2x 图片。
4. 使用picture元素实现响应式图片
    ```html
    <picture>
      <source media="(min-width: 800px)" srcset="head.jpg, head-2x.jpg 2x">
      <source media="(min-width: 450px)" srcset="head-small.jpg, head-small-2x.jpg 2x">
      <img src="head-fb.jpg" srcset="head-fb-2x.jpg 2x" >
    </picture>
    ```
5. 使用相对大小的图片
    ```html
    <img src="lighthouse-200.jpg" sizes="50vw"
      srcset="lighthouse-100.jpg 100w, lighthouse-200.jpg 200w,
        lighthouse-400.jpg 400w, lighthouse-800.jpg 800w,
        lighthouse-1000.jpg 1000w, lighthouse-1400.jpg 1400w,
        lighthouse-1800.jpg 1800w">
    ```
    ```html
    <img src="400.png"
      sizes="(min-width: 600px) 25vw, (min-width: 500px) 50vw, 100vw"
      srcset="100.png 100w, 200.png 200w, 400.png 400w,
        800.png 800w, 1600.png 1600w, 2000.png 2000w">
    ```
6. 使用媒体查询有条件地加载图片
    ```css
    .example {
      height: 400px;
      background-image: url(small.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: center;
    }
    
    @media (min-width: 500px) {
      body {
        background-image: url(body.png);
      }
      .example {
        background-image: url(large.png);
      }
    }
    ```
7. 使用image-set提供高分辨率图片
    ```css
    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    ```
8. 使用媒体查询提供高分辨率图片
    ```css
    .sample {
      width: 128px;
      height: 128px;
      background-image: url(icon1x.png);
    }
    
    @media (min-resolution: 2dppx), /* Standard syntax */
    (-webkit-min-device-pixel-ratio: 2)  /* Safari & Android Browser */
    {
      .sample {
        background-size: contain;
        background-image: url(icon2x.png);
      }
    }
    ```
    ```css
    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    ```
9. 用unicode字符代替简单图标
10. 用svg代替复杂图标
11. 选择正确的格式，如摄影图片使用jpg，矢量图片使用svg，如不可用使用webp或png，需要更丰富的颜色及更好的压缩比时，使用png代替gif
12. 使用延迟加载技术
13. 优先使用css代替图片
14. 压缩图片
15. 尽量不要将文字嵌入图片
