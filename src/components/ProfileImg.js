import "./ProfileImg.scss";
import pointer from "../pointer.png";
const crown = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAARVBMVEVHcEwAAAAAAAD84QAAAAAAAAAAAAAAAAAAAAAAAADvOhb/uQD8ywLxQxUmGQH0bw9WRADr0gC5lwDsqwDXuwClJw+XgQCiuZ9TAAAACnRSTlMAgP//8SVu2cWWgCelzAAAAcpJREFUWMPtl1u7RSAQhmlYiSTE//+pu8Moh9aStT37Yj++q68xvY1EybJHjx79tV5VUVQv53NK0IeocTQ/5u5UVsSqKrWnztMy5nRytfJ74TVNyjK6+MI7Gtwql0bui3jljHwUy4N/RQuSqpdLhhxH9LJfoiFmokq68ncqdLQH6IXLE42W9RK05Damvc5V5t4PIHPVdBlc4mA6DdgD+T5mvIka8xbkBpeNlcQedvQQwzJPQL0pY3SdGjEDag4xnaASQDATMmOfRoGXWmL65hB/AgIhlz4NrOSDUkAaSI0xTiCNKhEEHHvwLegQPgVBlONJkA6CKAdJcAXEDxPkB+CXQBDn7OIpIOBxEOdXQSl6QP8FxL4Fsdim9g1ou4/gRvYVaF1TaTeYqV5eg65tO/8qfGjVk92cyk1Boq4RxFtt65aft7QVm5LMtj7p6+5yV1t15y3tps0BwOyytQe1LjmhZexmCZC7QLfdGk52++vJPjx+Pebqgb9tHR7/bQvyvlfkvpf2xu8RHv2uqI8e/Sjxp7NUDdHzce7Pi8kFidgU4VoaklH9sF9Du7V0TSz79A+Rrir+d8RuqcfOE6NFKqSgrHz+TB89+nv9AP6uMEMQrue6AAAAAElFTkSuQmCC`;
export default class ProfileImg {
  data = null;
  constructor({ $target, data }) {
    this.$target = $target;
    this.setState(data);
  }
  setState(data) {
    this.data = data;
    this.render();
  }
  render() {
    const { profile } = this.data;
    if (!profile) return;
    this.$target.innerHTML = `
        <img class="profile" src="${profile}" alt="CreatiCoding" />
        <img class="pointer" src="${pointer}" alt="arrow" />
        <div class="crown"><img src="${crown}" alt="👑" /></div>
    `;
    this.$target.addEventListener("click", function () {
      window.location.href = "/about";
    });
  }
}
