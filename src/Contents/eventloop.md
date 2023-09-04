# Event Loop trong JavaScript - Cách JavaScript xử lý các tác vụ bất đồng bộ.
_Đây không phải là 1 chủ để mới mẻ với các bạn Lập trình viên JavaScript đã có kinh nghiệm, đây là bài Blog đầu tiên mình viết, hy vọng nó sẽ giúp đỡ các bạn mới tiếp cận JavaScript có cái nhìn tốt hơn về ngôn ngữ này, Cảm ơn đã ghé thăm😉😉😉_

### 1. Even Loop là gì ?
Có lẽ với mọi lập trình viên JavaScript đều đã biết rằng JavaScript là một ngôn ngữ đơn luồng (Phần bất đồng bộ mình sẽ có 1 bài khác). JavaScript là một ngôn ngữ hoạt động đơn luồng (Single-thread), tức là chỉ duy nhất 1 tác vụ được thực thi tại 1 thời điểm trong **Call Stack** (Lưu ý cái này nhé). Ukm, vậy thì sao nhỉ ? Khi gặp 1 tác vụ ngốn đến 5-10 hoặc 20 giây chờ thì sao (Call API, SetTimeout hoặc đọc ghi file). Giả dụ nếu JavaScrip chạy trên **Engine V8** (trình duyệt Chrome) thì có phải toàn bộ trình duyệt của chúng ta sẽ bị kẹt lại khoảng thời gian đó, không ổn chút nào !!! . Và đây chính là vấn đề chúng ta cần làm rõ.

Thật ra bản thân **Engine v8** hoặc các JavaScript Engine khác đã cung cấp cho chúng ta 1 công cụ cực kỳ mạnh mẽ và thú vị mà bản thân JavaScript không hề có, đó chính là WebAPIs, đây chính là công cụ giúp JavaScript có thể thực thi các tác vụ một cách bất đồng bộ (Hiểu đại khái là trong lúc chờ 1 ông thực thi các tác vụ IO, ừm Ví dụ như khi fetch 1 HTTP request chả hạn, trong lúc chờ Server phản hồi ấy thì **Call Stack** sẽ thực hiện 1 tác vụ khác để tránh trường hợp **IO-Blocking**).

#### Engine V8 ?
Đầu tiên, cần làm rõ **Engine V8** (Hay còn gọi là **Chrome V8**) là gì ? Không có gì khó hiểu, cũng như mọi ngôn ngữ lập trình ứng dụng khác thì **Engine V8** là một JavaScript Engine (được viết bằng C++ bởi Google, Chrome của Google mà ^^), Hiểu đơn giản thì nó là cái thằng sẽ thực thi code JavaScript của bạn, vậy thôi. Ngoài Engine V8 ra, còn rất nhiều JavaScript Engine nữa (Rhino, SpiderMonkey, Chakra, ....), tuy nhiên chúng gần như tương tự nhau.

#### Non-blocking IO
Chắc hẳn code JavaScript 1 thời gian, các bạn ít nhiều lần nghe qua khái niệm này, trước khi code JavaScript, đa số các bạn (cả mình) đều sẽ bắt đầu bằng C, C++ hoặc Java, ..., chúng là những ngôn ngữ chạy một cách tuần tự, tức là chạy từ trên xuống, xong thằng trước mới đến thằng đẳng sau, Nhưng JavaScript thì không vậy (À chính xác phải là NodeJs / Hoặc JavaScript thực thi qua Engine V8, ...). IO ở đây chính là Input/Output, hiểu là các tác vụ đọc ghi sẽ tốn thời gian, điều này khiến nó sẽ block tất cả các thằng khác đang chạy. Đây là lúc cơ chế Non-blocking IO của NodeJS thể hiện (hơi rắc rối nhỉ, bạn hãy hiểu đơn giản thì bài viết này dành cho JavaScript chạy trên môi trường NodeJS hoặc chạy trên trình duyệt web nhé), cơ chế này giúp cho JavaScript (...) có thể thực thi nhiều tác vụ bất đồng bộ 1 lúc tại 1 nơi, gọi là WebAPIs, thay vì chờ ông thứ nhất xong, mới bắt đầu thực thi rồi chờ các ông phía sau. (Phần sau sẽ làm rõ hơn đoạn này). Điều này đem lại hiệu năng khá tốt so với các ngôn ngữ khác (trong vài tình huống).

#### Được rồi, quay lại với Event Loop, Event Loop là gì ?
Event Loop là 1 cơ chế giúp JavaScript thực thi nhiều tác vụ bất đồng bộ 1 lúc (Nhớ nhé, **cơ chế giúp**, không phải **cơ chế của**), nó là 1 vòng lặp vô tận, cứ quay mãi, quay mãi ... chỉ để thực nhiện duy nhất 1 nhiệm vụ: 
+ Kiểm tra **Call Stack** có đang trống hay không, nếu đang trống nó sẽ lấy 1 context (1 tác vụ IO đã sẵn sàng thực thi, ừm hãy lấy tiếp Ví dụ phía trên nhé, đây giống như 1 HTTP request đã được phía Server phản hồi) trong **Queue** (Lưu ý khái niệm này nhé) và đưa vào **Call Stack** để thực thi, nếu không thì nó quay tiếp ...
  - Có 2 loại Queue, ở đây mình chỉ đưa ra, mình sẽ nói rõ ở một bài khác:
    * Job Queue (Macrotask Queue).
    + Task Queue (Microtask Queue).

+ Và khi hết các tác vụ thì nó vẫn chưa dừng lại, vẫn quay mãi, quay mãi.

### 2. Event Loop hoạt động như thế nào ?
OK, giờ mình sẽ trình bày chi tiết hơn về Event Loop. 
<!-- ![EventLoop](https://cdn.datainfinities.com/images/10-event-loop.png) -->
<img src="https://cdn.datainfinities.com/images/10-event-loop.png"  width="60%" height="auto">
Trước tiên sẽ đến với 3 khái niệm quan trọng trong phần này:
+ **Call Stack** : Đây là 1 Stack (1 Cấu trúc dữ liệu chứa các tác vụ JavaScript mà chương trình sẽ thực thi một cách lần lượt - một cách đồng bộ).
+ **Web APIs** : Là tập hợp các API dùng để thực thi các tác vụ bất đồng bộ, đây là nơi sẽ thực thi các tác vụ IO đồng thời cùng CallStack.
+ **Queue** : Đây là nơi chứa những tác vụ bất đồng bộ đã được Web APIs xử lý, chờ Event Loop bế vào CallStack để thực thi.

Rồi, mình lấy 1 ví dụ đơn giản cho dễ hiểu nhé.
``` js
console.log("First")

setTimeout(() => {
  console.log("Second")
}, 2000)

console.log("Third")
// Expected output
// "First"
// "Third"
// "Second"
```
Bắt đầu phân tích kỹ hơn Ví dụ Trên để hiểu hơn Event Loop.
<img src="https://i.ibb.co/s50r6XR/Javascript-Event-Loop-Web-APIs-1.png"  width="60%" height="auto">
Đầu tiên, ```console.log("First")``` được gọi, nó được thêm vào **Call Stack**, đây là 1 tác vụ Non IO (Chỉ log 1 message-text ra màn console thôi mà), nên nó được thực thi ngay lập tức và bị xóa khỏi **Call Stack**.

"First" được in ra màn console.

<img src="https://i.ibb.co/JyWv41P/Javascript-Event-Loop-Web-APIs-2.png"  width="60%" height="auto">

Tiếp theo, ```setTimeout(() => {
  console.log("Second")
}, 2000)``` được gọi, được thêm vào **Call Stack**, ```setTimeout``` sẽ bắt đầu 1 bộ hẹn giờ.
<img src="https://i.ibb.co/TWggmmm/Javascript-Event-Loop-Web-APIs-3.png"  width="60%" height="auto">
<img src="https://i.ibb.co/sQzQ5F4/Javascript-Event-Loop-Web-APIs-4.png"  width="60%" height="auto">


Đây là 1 tác vụ Blocking IO, vì vậy nó sẽ được bế ra khỏi **Call Stack** và thêm vào **Web APIs** (không lẽ chờ 2s, trong 2s đó trình duyệt không thực hiện tác vụ gì, ồ vậy thì hơi kỳ quặc và giảm hiệu năng đi đáng kể).
<img src="https://i.ibb.co/nj6sHR4/Javascript-Event-Loop-Web-APIs-5.png"  width="60%" height="auto">


Dĩ nhiên sau khi được thêm vào **Web APIs** thì nó sẽ bắt đầu thực thi tác vụ Blocking IO (đồng thời với các tác vụ Blocking IO khác đang nằm trong **Web APIs**).

Tiếp theo, ```console.log("Third")``` được gọi, nó được thêm vào **Call Stack**, giống như thằng đầu tiên, đây là 1 tác vụ Non IO, nên nó được thực thi ngay lập tức và bị xóa khỏi **Call Stack**.

"Third" được in ra màn console.

<img src="https://i.ibb.co/vw4LfjJ/Javascript-Event-Loop-Web-APIs-6.png"  width="60%" height="auto">


Sau 2s, bộ hẹn giờ đã kết thúc và tác vụ trong hàm ```setTimeout``` trên đã sẵn sàng được thực thi, nó được thêm vào **Queue**.

<img src="https://i.ibb.co/nj6sHR4/Javascript-Event-Loop-Web-APIs-5.png"  width="60%" height="auto">

<img src="https://i.ibb.co/nQBwdvK/Javascript-Event-Loop-Web-APIs-8.png"  width="60%" height="auto">
Lúc này, Event Loop vẫn đang "lắng nghe" **Call Stack** và đã nhận thấy **Call Stack** trống, nó sẽ bế 1 thằng từ **Queue** ra, thêm vào **Call Stack** để thực thi, lúc này trong **Queue** chỉ có duy nhất 1 tác vụ (tác vụ trong hàm ```setTimeout```)

<img src="https://i.ibb.co/5L1vxqx/Javascript-Event-Loop-Web-APIs-10.png"  width="60%" height="auto">

Cuối cùng, ```console.log("Second")``` được thực thi ngay lập tức và bị xóa khỏi **Call Stack**.
<img src="https://i.ibb.co/hVNtBJC/Javascript-Event-Loop-Web-APIs-11.png"  width="60%" height="auto">

"Second" được in ra màn console.

<img src="https://i.ibb.co/JyWv41P/Javascript-Event-Loop-Web-APIs-2.png"  width="60%" height="auto">

Kết thúc 1 Ví dụ đơn giản. 

Có vẻ đơn giản, phải không ?

Hy vọng bài viết của mình sẽ giúp đỡ các bạn lập trình JavaScript mới có cái nhìn tổng quát hơn về ngôn ngữ này, hiểu thêm 1 chút về cách JavaScript xử lý các tác vụ bất đồng bộ. Nếu có đóng góp hay thắc mắc gì có thể trao đổi với mình.

Cảm ơn các bạn đã ghé thăm và đọc.
