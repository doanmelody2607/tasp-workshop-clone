document.addEventListener('htmx:configRequest', function (event) {
  console.log({ event });
  document.getElementById('loadingStatus').style.display = 'block';

  setTimeout(() => {
    window.location.href = '/contact/thanks/';
  }, 1000);

  //   if (event.detail.xhr.getResponseHeader('HX-Redirect')) {
  //     // Nếu có, bạn có thể chuyển hướng đến trang mới tại đây
  //     window.location.href = event.detail.xhr.getResponseHeader('HX-Redirect');
  //   }
});

document.addEventListener('htmx:load', function (event) {
  document.getElementById('loadingStatus').style.display = 'none';
});
