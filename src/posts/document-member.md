---
title: 'Tài liệu hướng dẫn: Thành viên'
description: Hướng dẫn tạo 1 bài viết giới thiệu về bản thân
date: 2023-12-13T11:30
thumb: member.jpg
author: 1 bát phở đầy hành
tags:
  - tips
name: ''
---

# Để có thể tạo 1 bài viết giới thiệu về bản thân

- Với những bạn chưa có git thì download git ở [đây](https://git-scm.com/downloads)

## Bước 1

Click chuột phải ở nơi bạn muốn lưu source, và chọn `git bash`

![Git Bash](/assets/img/posts/git-bash.png)

Clone source về với cú pháp:

```
git clone http://git.tasp.vn/asp/tasp-workshop.git
```

Đổi nhánh sang content với cú pháp:

```
git checkout feature/content
```

Kiểm tra xem code ở nhánh `feature/content` đã là code mới nhất hay chưa, để tránh khi các bạn push bài viết của các bạn lên không bị conflict:

```
git pull origin develop
```

## Bước 2

Các bạn tìm tới thư mục `members` có đường dẫn như sau `src\members`.

Các bạn có thể clone một `bài biết` trong `members`, đổi tên file với cấu trúc `ho-tenlot-ten.md`. VD: [le-quoc-dat.md](https://workshop.tasp.vn/members/le-quoc-dat/).

Sau đó thay thế nội dung phù hợp.

### Cấu trúc của 1 bài viết

#### 1. Thông tin cơ bản

Bắt đầu và kết thúc bằng `---`

Trong `Thông tin cơ bản` sẽ bao gồm các dữ liệu như:

```js
name: 'Lê Quốc Đạt' //Họ và tên
role: 'Kỹ sư công nghệ thông tin' //Nghề nghiệp
user-group: //Đây là danh sách các Vai trò của thành viên. VD: 'FE', 'BE'...
  - FE
  - BE
image: 'le-quoc-dat.jpg' //Ảnh đại diện
interests: //Danh sách cácSở thích
  - Đọc sách
  - Đá bóng
  - Chơi game

education: //Trình độ học vấn
  courses:
    - course: Công nghệ Phần Mềm
      institution: Đại học Thông Tin Liên Lạc
      year: 2012

socials: //Mạng xã hội
  - icon: email
    link: 'mailto:datseoweb@gmail.com'
  - icon: github
    link: https://github.com/dathello90
  - icon: youtube
    link: https://www.youtube.com/@OngDesign
```

Các bạn có thể tham khảo file `le-quoc-dat.md` để viết theo

#### 2. Mô tả về bản thân

Mục này sẽ ở dưới phần `Thông tin cơ bản`

Ở đây các bạn có thể viết bất cứ thứ gì các bạn muốn mô tả bản thân mình là người như thế nào, tính cách ra sao, mục tiêu phấn đấu ...

#### Dưới đây là kết quả mà bạn có được sau khi hoàn thành

![Result](/assets/img/posts/result.png)

#### Một số lưu ý

- `image: 'le-quoc-dat.jpg'`, ảnh đại diện được lưu ở thư mục `img` (`src\members\img`)
- Phần `socials` hiện tại đang có 5 mảng social là `email`, `twitter`, `google`, `github`, `youtube`. Nếu như bạn muốn bổ sung thêm mạng xã hội khác của mình, liên hệ với dev để bổ sung.

## Bước 3

Sau khi đã hoàn thành bài viết giới thiệu về bản thân, click chuột phải ở nơi bạn lưu source và chọn `git bash`.

- Có thể làm bước này để kiểm tra xem có code mới hay không trước khi đẩy bài viết của bạn lên để tránh bị conflict

```
git pull origin develop
```

Và làm tuần tự các bước sau:

```
git add .
git commit -m "`Nội dung bạn muốn commit`"
git push origin develop
```

Bạn thông báo cho dev để merge nội dung mà bạn vừa đẩy lên.

Và đây là thành quả của bạn sau khi đẩy code lên server

![Product](/assets/img/posts/product.png)
