# Golang ? Tại sao lại là go ? Góc nhìn của 1 dev Javascript cỏ tới Go và hơn thế nữa !!!.

_Hi mọi người, đợt này cũng lâu rồi k dành thời gian viết lách, cũng bận (code 1 dự án phụ và đi làm xế cho cô bạn ngồi sau ^^). Hôm nay quay lại với cái góc nhỏ phủ bụi này và hôm nay chủ đề sẽ là Golang. Tại sao mình lựa chọn Go mặc dù công việc hiện tại mình không dùng đến ? Go có gì thú vị và những topic cơ bản dưới góc nhìn của 1 dev cỏ đã từng sử dụng Go. Cảm ơn đã ghé thăm😉😉😉_

<figure>
    <img src="https://do-an.s3.ap-southeast-2.amazonaws.com/workspace1.jpg"  width="100%" height="auto" margin="auto">
    <figcaption>Góc phòng, nơi <b>cô bạn thân</b> hỏi sao lại có thể ngồi yên 1 chỗ suốt mấy tiếng buổi tối được ?? 😂😂.</figcaption>
</figure>
 

### 1. Tại sao lại là Golang ? 


Đầu tiên tại sao lại chọn Go ? công việc trước đây của mình có yêu cầu sử dụng Go nên mình đã học và sử dụng nó, uhm nhưng mà mình phải công nhận đây là 1 thẳng thú vị và đáng để học (có thể hiện tại mình chưa dùng đến nhưng ít nhất tham khảo lý do và điểm mạnh của nó qua các diễn đàn thì mình thấy đáng lắm, thật ấy).

Mình bắt đầu học Go khi mình nhờ anh mentor trong team tư vấn (hồi đấy mình còn ngồi ở Keangnam, bắt đầu vào năm cuối đại học thì phải) và ảnh kêu mình học Go đi, và OK với một thằng liều không sợ trời không sợ đất như mình (😌😌😌) thì mình cũng học chứ sợ gì. Thì cũng như những thằng khác, mình bắt đầu đọc về những blog giới thiệu (điểm mạnh, tương lai hay cộng đồng hỗ trợ như thế nào ? nó có thể làm gì ?), sau đó bắt đầu bằng vài buổi học syntax, data types, module management, bla blo ... rồi mình join các feature đơn giản của team và rồi mình code thêm cả Go. Từ lúc sang team mới thì mình cũng gần như không sử dụng Go nhưng cố gắng duy trì thi thoảng đọc lại vài blog hoặc cái gì đó na ná khỏi quên em ấy, à thêm chút thì Go được phát triển bởi Google (xịn) và ngẫm nhiên Golang là viết tắt của google language.

<img src="https://do-an.s3.ap-southeast-2.amazonaws.com/golang+meme.jpg"  width="60%" height="auto" margin="auto">

Được rồi, mình có thể kể ra 1 vài đặc điểm để các bạn có thể tham khảo xem có đáng để học nó không nhé !!!. Đầu tiên thì mình từng đọc hoặc nghe ở đâu đó đại khái rằng "Golang có cú pháp gần giống C nhưng tinh gọn và đơn giản như Python" (Wow... đẳng cấp), cùng với tốc độ xử lý vượt trội nữa và rồi mình cũng tìm hiểu thì, đúng thật rất nhiều người đã làm những phép so sánh về tốc độ xử lý của Go và đều cho thấy rằng tốc độ của nó là vượt trội hơn so với các ông khác. (tham khảo tại [Bài viết này](https://pkolaczk.github.io/memory-consumption-of-async/)), lược qua 1 chút thì đây là 1 bài so sánh của Go, NodeJS, Java, Python, C# và Rust thì ở ngưỡng 1-10000 task thì Go tỏ ra vượt trội so với phần còn lại (Bỏ qua Rust đi, thằng này ở phương trời khác rồi 😆😆😆) nhưng ở ngưỡng 100000-1000000 task thì Go tỏ ra yếu thế hơn 1 chút, thế là đủ thấy sức mạnh của nó rùi nhớ. Tiếp theo đến tốc độ phát triển (mình thấy 1 ngôn ngữ mạnh đến đâu cộng đồng hỗ trợ không lớn thì cũng chưa thể là 1 ngôn ngữ vippro được) thì tham khảo có thể thấy Go có một bộ thư viện lớn không kém NodeJS mặc dù ra đời sau, có thể thấy được cộng đồng hỗ trợ Golang cũng cực kỳ hùng hậu. Còn nhiều điều hay ho phía dưới nữa đây sẽ là 1 bài khá dài đấy và đi vào lý thuyết nhiều hơn là demo vì ngoài viết lách ra thì mình cũng ôn lại kiến thức luôn mà, dành chút thời gian đọc chill chill nhé ^^.

### 2. Những đặc điểm nổi bật của Golang.

Dưới đây mình sẽ liệt kê các đặc điểm nổi bật của Go, dĩ nhiên là mình tổng hợp từ vài nguồn uy's tín chứ.

#### Golang là static typed: 

Khác với JavaScript và Python là dynamically typed thì Go là static typed (tức là khi khai báo biến thì kiểu dữ liệu phải được xác định), và dĩ nhiên điều này sẽ làm cho khi biên dịch sẽ giảm bớt lỗi (à nhắc lại thì Golang là biên dịch nha, Python và Javascript là thông dịch).

#### Build/Compile cực nhanh:

Nếu so sánh với C/C++ thì quá là khập khiễng nhưng chênh lệch sẽ là không quá lớn, tuy nhiên so với mấy ông như Ruby, Java hay Python thì chăc cũng phải làm D*ddy ấy chứ 😂😂😂. Túm lại thì Go sở dữ điều kiện để quá trình build/compile diễn ra nhanh hơn đáng kể với những ngôn ngữ biên dịch khác.

#### Go cực kỳ nhanh, dễ maintain và scale:

Đơn giản bởi Golang được thiết kế ra để giao tiếp với tầng dưới bằng mã nhị phân (bởi nó là biên dịch) nên sở hữu tốc độc cũng okela đấy. Ngoài ra bởi có cú pháp tinh gọn và đơn giản dễ đọc, dễ hiểu (Không như C hay Java) nên tốc độ phát triển của dự án hay khi maintain cũng không có quá nhiều khó khăn. Ngoài ra Go cũng không hề có OOP, không có annotations, không try/catch exception nên cũng góp phần làm cho nó trở nên đơn giản và dễ tiếp cận hơn.

Đây là ngôn ngữ cân bằng giữa tốc độ code và hiệu năng của ứng dụng, như trên mình đã viết thì Golang được thiết kế bởi Google nên các kỹ sư của họ đã đặt mục đích phát triển 1 ngôn ngữ dễ học, dễ hiểu, đơn giản nhưng lại có hiệu năng tốt thì Golang đã có được sự cân bằng này. 

#### Thêm 1 ưu điểm nữa:

Đó là được phát triển và bảo kê (hậu thuẫn) bởi Google nên yên tâm là Go tương thích cực mạnh tới các hạ tầng cloud cộng với nhiều hệ thống. Có thể kể tên các dự án được viết bằng Go như: Docker, K8s, fiber, ...


### 3. Các kiểu dữ liệu trong Golang:
Với bất kỳ ngôn ngữ nào thì cũng phải lưu tâm đến data types, nó cùng với syntax cơ bản gần như là bắt buộc khi muốn tiếp cận 1 ngôn ngữ mới.

Đầu tiên, có thể chia data types trong Go thành 4 loại: 
- Basic type: Number, String, Boolean.
- Aggregate type: Array, Struct.
- Reference type: Pointer, Slices, Maps, Functions, Channels.
- Interface type

| Datatype | Description | Example |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
|**Number**| Trong Go, có nhiều kiểu dữ liệu số (na ná C đó), từ int (int8, int 16, int32, int64, uint8, uint16, ...), float (float32, float64), complex (complex64, complex128). | Số nguyên, số thực và số phức. |
| String | Thui nhỉ 😂😂😂. | "dev", "golang", ...|
| Boolean | Thui nhỉ 😂😂😂. | true, false, ...|
| Array | Kiểu dữ liệu mảng (cùng kiểu) và kích thước cố định. | var arr [5]int, ...|
| Slices | Khác với array, slice là một mảng động có kích thước linh hoạt. | var slice []int, ...|
| Maps | Kiểu dữ liệu dưới dạng cặp key/value. | var m map[string]int, ...|
| Struct | Kiểu dữ liệu dùng để biểu diễn cấu trúc dữ liệu phức tạp. | type person struct { name string; age int }, ...|
| Pointer | Giống như C, kiểu dữ liệu con trỏ dùng để lưu trữ địa chỉ bộ nhớ của 1 biến. | a := 1 <br> b := &a // b is point to a's memory, ...|
| Function | Thui nhỉ 😂😂😂. |...|
| Channel | Đây là kiểu dữ liệu cung cấp cách giao tiếp giữa các goroutine. | var ch chan int, ...|
| Interface | Kiểu dữ liệu định nghĩa các action (method) chung mà nhiều kiểu dữ liệu có thể triển khai. | type Namer interface { <br> GetName() string <br> }, ...|

Cái này hay nè, **map[string]interface{}**: Cực kỳ hữu ích nếu bạn code Golang. Cùng tìm hiểu 1 chút nhé:

```
foods := map[string]interface{}{
    "bacon": "delicious",
    "eggs": struct {
        source string
        price  float64
    }{"chicken", 1.75},
    "steak": true,
}
```

Nếu bạn từng code JavaScript thì mấy thứ đại loại Object trong Object đã quá quen thuộc rồi phải không (bởi thằng JS quá mạnh để xử lý kiểu json mà) thì đây sẽ là cứu cánh cho bạn, nói đến đây cộng với cái ví dụ trên là đã hiểu vấn đề rùi đúng hông ??? hehe quá xịn. 


Đến đây thui, sau bài này mình sẽ viết 1 bài về Goroutine và Channel. Có gì góp ý thì góp ý cho mình để chúng ta cùng tốt hơn nhé, cảm ơn đã đọc.