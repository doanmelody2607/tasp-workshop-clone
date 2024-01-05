---
title: 'Cải thiện hiệu suất tải ảnh với thư viện eleventy-plugin-lazyimages trong 11ty'
description: 'This post uses an external image as a thumbnail This post uses an external image as a thumbnail'
date: 2022-12-13T10:30
thumb: 'eleventy-plugin-lazyimages.png'
author: 'M2PD'
tags:
  - tips
  - sample
---

## Giới Thiệu

`eleventy-plugin-lazyimages` là một plugin cho Eleventy, giúp tối ưu hóa tải ảnh trong ứng dụng web của bạn bằng cách thêm tính năng tải ảnh chậm (lazy loading). Lazy loading giúp giảm thời gian tải trang bằng cách chỉ tải ảnh khi chúng sắp xuất hiện trong tầm nhìn của người dùng.

## Chức Năng Chính

1. Lazy Loading Ảnh: Tự động thêm thuộc tính loading="lazy" vào các thẻ hình ảnh, giúp tối ưu hóa việc tải ảnh và cải thiện hiệu suất trang.

2. Xử Lý Ảnh Tự Động: Cung cấp khả năng tự động xử lý và tối ưu hóa ảnh trước khi chúng được tải lên trang web, giảm dung lượng và tăng tốc độ tải trang.

3. Cấu Hình Linh Hoạt: Cho phép người dùng cấu hình các tùy chọn như chọn phần tử ảnh, chuyển đổi đường dẫn ảnh, sử dụng ảnh thay thế và nhiều tùy chọn khác.

## Cài Đặt

```sh
npm install --save-dev eleventy-plugin-lazyimages
```

#### Lỗi phát sinh(Windown)

- Lỗi cài đặt `sharp`

```sh
npm install sharp
```

- Nếu lỗi chưa được fix, chạy tiếp lệnh sau

```sh
npm install --os=win32 --cpu=x64 sharp
```

hoặc

```sh
npm install --force @img/sharp-win32-x64
```

### Sử Dụng

```js
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    // Cấu hình plugin tại đây
  });

  // Các cấu hình khác của Eleventy nếu có
};
```

Sau đó, thẻ hình ảnh trong trang HTML sẽ tự động được thêm thuộc tính lazy loading:

```html
<!-- Trước khi sử dụng plugin -->
<img src="/path/to/your/image.jpg" alt="Description" />

<!-- Sau khi sử dụng plugin -->
<img data-src="/path/to/your/image.jpg" alt="Description" loading="lazy" />
```

## Tài Liệu Thêm

Để biết thêm thông tin và tùy chọn cấu hình, hãy tham khảo [tài liệu chính](https://github.com/liamfiddler/eleventy-plugin-lazyimages).

## Dự án triển khai: (Test với chế độ `slow 3G`)

`Khi không sử dụng thư viện`: khi load, các ảnh chưa load được sẽ ở trạng thái `pending` trên network và các ảnh đó không hiển thị trên màn hình, làm trống đi không gian trang web -> trải nghiệm xấu
![No Pluggin](/assets/img/posts/slow-3g.gif)

`Sử dụng Plugin`:

- Hiển thị chế độ mờ(blurry low-res placeholder) cho đến khi ảnh được load hoàn toàn
- `preferNativeLazyLoad`: `loading="lazy"` Các ảnh sẽ được tải từng phần trước khi được hiển thị toàn bộ
- Thêm thuộc tính chiều rộng và chiều cao cho phần tử

![Pluggin](/assets/img/posts/loading-image.gif)

Với Pluggin này, trải nghiệm sử dụng tốt hơn cho các trang có sử dụng image 🎉🎉🎉
