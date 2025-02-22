(function() {
    if (!CSS.supports('gap', '1px')) {
      const style = document.createElement('style');
      style.innerHTML = `
        .flex-gap {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
        }
        .flex-gap > * {
          margin-right: 10px;
        }
        .flex-gap > *:last-child {
          margin-right: 0;
        }
      `;
      document.head.appendChild(style);
    }
  })();  