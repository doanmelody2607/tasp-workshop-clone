---
title: 'Tất tần tật về định danh phiên bản phần mềm'
description: 'This post uses an external image as a thumbnail'
date: 2023-12-07T16:15
thumb: 'version.jpg'
tags:
  - tips
---

# Tất tần tật về định danh phiên bản phần mềm
Làm sao để họ biết tôi đã thay đổi rất nhiều, nhất là khi tên tôi vẫn vậy?

Mở đầu
--------

Định danh phiên bản phần mềm (Software versioning) là một công đoạn trong công nghệ phần mềm mà ở đó một tên riêng và duy nhất được sử dụng để đánh dấu một trạng thái cụ thể của phần mềm.

Ở phase phát triển (development), các hệ thống quản lý phiên bản (revision control) như Git sẽ tự động sinh `id`, [chẳng hạn `6ccda4c93c1fa3df8e02faf5382ddc86448ac878`](https://stackoverflow.com/a/29107504/6755585), mỗi khi người dùng commit các thay đổi.

Khi phát hành, tên cho phiên bản phần mềm thường thân thiện với con người hơn, có thể được gán dạng số tăng dần như `4.3.18`, hoặc tên riêng như [Dapper Drake](https://wiki.ubuntu.com/DapperDrake/), miễn là độc nhất.

Nghĩ ra một cái tên không khó, nhưng làm sao để tên đó phản ánh được mức độ thay đổi của trạng thái phần mềm, truyền tải ý nghĩa cho các bên liên quan có thể hiểu, thì không hề đơn giản. Bất kỳ ai cũng có thể sáng tạo ra cách định danh phiên bản cho riêng mình, thoả mãn được yêu cầu ở trên thì càng tốt. Tuy vậy trong thực tế có một số lược đồ định danh phiên bản hữu ích được cộng đồng đón nhận và áp dụng rộng rãi hơn cả.

Các lược đồ phổ biến
--------------------

### SemVer

#### Mô tả

Semantic Versioning hay [SemVer](https://semver.org/) là lược đồ định danh phiên bản được sử dụng rộng rãi nhất. Một cách ngắn gọn, mỗi phiên bản sẽ được đánh số theo cấu trúc **`MAJOR`.`MINOR`.`PATCH`**, trong đó nhà phát triển sẽ tăng:

*   `MAJOR`: khi phần mềm giới thiệu API mới **hoàn toàn không tương thích với các bản trước đó**
*   `MINOR`: khi phần mềm thêm các tính năng hoàn toàn tương thích với các API hiện có
*   `PATCH`: khi phần mềm được fix bug hoàn toàn tương thích với các API hiện có

Dễ thấy độ rủi ro khi thay đổi phiên bản tăng dần từ phải qua trái. Độ rủi ro của phiên bản còn có thể thể hiện chi tiết hơn nữa thông qua 2 phần không bắt buộc sau:

*   Hậu tố tiền xuất bản: (tiêu biểu như `alpha`, `beta`, `rc`, etc.) có thể được gắn sau `PATCH`, ngăn cách bởi dấu `-` để thể hiện thêm độ rủi ro của phiên bản, thường trong giai đoạn chuẩn bị phát hành (pre-release)
*   Mã bản build (build metadata): có thể được gắn sau cùng và được ngăn cách bởi dấu `+`

4 . 3 . 18 \- beta + 5114f85

Quy ước khi `MAJOR` bằng 0, phần mềm đang ở trạng thái bắt đầu phát triển. Mọi tính năng đang hình thành và thay đổi mạnh mẽ, nên rất thiếu ổn định để có thể sử dụng trong production. Tất nhiên vẫn có những ngoại lệ như React Native. Thư viện phát triển app mobile bằng JS này chưa biết đến khi nào mới phát hành chính thức bản đầu tiên, song đã được sử dụng vô cùng rộng rãi trong thực tế (phiên bản React Native ở thời điểm viết bài này là `0.70.x`).

#### Minh hoạ tiêu biểu

Hệ sinh thái Javascript `npm` sử dụng SemVer để quản lý phiên bản các gói phần mềm. Các gói cần nêu rõ phiên bản trong file `package.json`:

```
{
  "name": "mickey-mouse-boat",
  "version": "0.0.3"
  ...
}

```


Người dùng có thể sử dụng lệnh [`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version) để tự động thay đổi phiên bản trong `package.json` và commit.

```
npm version major   # 1.1.9 -> 2.0
npm version minor   # 1.1.9 -> 1.2
npm version patch   # 1.1.0 -> 1.1.10

```


Tuỳ thuộc vào nhu cầu sử dụng, `npm` hỗ trợ nhiều toán tử để khai báo phiên bản cho các gói/thư viện phụ thuộc trong `package.json`:

*   `1.2.3`: khớp chính xác phiên bản `1.2.3`
*   `>=1.2.7 <1.3.0`: khớp `1.2.8`, `1.2.99`, không khớp `1.3.0` hay `1.2.5`
*   `1.2.7 || >=1.2.9 <2.0.0`: khớp `1.2.7` hoặc `1.2.10`, không khớp `1.2.8`
*   `1.2.3 - 2.3.4`: khớp phiên bản theo khoảng, tương đương `>=1.2.3 <2.4.0`
*   `1.2.X`, `1.2.x`, `1.2.*`: khớp mọi `PATCH` của bản 1.2. `X`, `x` hay `*` tất nhiên có thể sử dụng với cả `MAJOR` hay `MINOR`
*   `~1.2.3`: tương tự `>=1.2.3 <1.3.0`
*   `~1.2`: tương tự `>=1.2.0 <1.3.0`
*   `~1`: tương tự `>=1.0.0 <2.0.0` hay `1.x`
*   `^1.2.3`: tương tự `>=1.2.3 <2.0.0`
*   `^0.x`: tương tự `>=0.0.0 <1.0.0`

Đọc thêm [hướng dẫn sử dụng npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver), hay vọc ngay [npm semver calculator](https://semver.npmjs.com/).

### CalVer

#### Mô tả

Calendar Versioning hay CalVer là lược đồ định danh phiên bản dựa trên thời gian phát hành phiên bản đó. Tên của phiên bản bao gồm những phần sau:

*   `MAJOR`: Số đầu tiên trong phiên bản
*   `MINOR`: Số thứ 2 trong phiên bản
*   `MICRO`/`PATCH`: Số thứ 3, thường là số cuối cùng, trong phiên bản
*   `MODIFIER`: tag tuỳ ý, không bắt buộc: `alpha`, `beta`, `rc`, etc.

Không khó để thấy các thành phần này rất tương đồng với lược đồ SemVer. Tuy nhiên trong khi SemVer chỉ rõ ý nghĩa và cách tính cho từng thành phần thì CalVer không giới hạn một quy chuẩn chung nào. Mỗi dự án có thể lựa chọn cách tính cho từng thành phần theo yêu cầu của mình, từ những giá trị sau:


|    |                                |                |
|----|--------------------------------|----------------|
|YYYY|Full year                       |2006, 2016, 2106|
|YY  |Short year                      |6, 16, 106      |
|0Y  |Zero-padded year                |06, 16, 106     |
|MM  |Short month                     |1, 2 … 11, 12   |
|0M  |Zero-padded month               |01, 02 … 11, 12 |
|WW  |Short week (since start of year)|1, 2, 33, 52    |
|0W  |Zero-padded week                |01, 02, 33, 52  |
|DD  |Short day                       |1, 2 … 30, 31   |
|0D  |Zero-padded day                 |01, 02 … 30, 31 |


#### Minh hoạ tiêu biểu

Ubuntu, 1 distro Linux nổi tiếng, sử dụng tên CalVer theo định dạng `YY.MM`, với phiên bản đầu tiên `4.10` được phát hành vào tháng 10/2004.

[youtube-dl](https://github.com/ytdl-org/youtube-dl/) sử dụng CalVer theo định dạng `YYYY.MM.DD`. Ở thời điểm viết bài, bản mới nhất là `2021.12.17` phát hành vào ngày, hmm, có lẽ bạn đã biết rồi đó.

C, ngôn ngữ lập trình của Chúa, định danh theo `YY`, chẳng hạn các phiên bản 89, 99, 11.

CockcroachDB đang ở bản `22.2.0-beta.2`, định dạng `YYYY.MINOR.MICRO-MODIFIER`. Dự án này từng dùng SemVer, và họ có lý giải [vì sao họ chuyển qua CalVer](https://www.cockroachlabs.com/blog/calendar-versioning/).

Xem thêm các dự án khác dùng CalVer tại [đây](https://calver.org/users.html).

### Một số lược đồ khác

Python có lược đồ định dang phiên bản riêng, được xuất bản với mã [PEP 0440](https://peps.python.org/pep-0440/).

[Debian](https://www.debian.org/doc/manuals/project-history/releases.en.html) đặt tên theo cấu trúc _`MAJOR.MINOR` + một nhân vật trong loạt phim Toy Story_: 1.1 Buzz, 1.2 Rex, 2.2 Potato, etc.

[TEX](https://www.wikiwand.com/en/TeX), dừng thêm tính năng mới từ bản số 3, sau mỗi lần cập nhật fix bug sẽ thêm một chữ số sau dấu phẩy theo số pi `π`. Phiên bản hiện tại của TEX là 3.141592653.

Chọn lược đồ nào?
-----------------

Theo [hướng dẫn từ trang chủ CalVer](https://calver.org/overview.html#when-to-use-calver) cũng như tham khảo thực tiễn từ CockcroachDB, nếu bạn thực sự biết dự án của bạn sẽ:

*   Quy mô lớn, thường xuyên thay đổi
*   Lĩnh vực phục vụ nhạy cảm với thời gian, múi giờ
*   Phát triển đến mức độ mà SemVer không còn phù hợp (như CockroachDB)

thì hãy chọn CalVer. Các trường hợp còn lại (là đa số), SemVer sẽ là chân ái.

Tham khảo
---------

*   [\[Official Specs\] SemVer](https://semver.org/)
*   [\[Official Specs\] CalVer](https://calver.org/)
*   [\[Wikipedia\] Software Versioning](https://www.wikiwand.com/en/Software_versioning)
*   [\[Wikipedia\] Software Release Lifecycle](https://www.wikiwand.com/en/Software_release_life_cycle)