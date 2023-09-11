# Lập trình đa luồng - Đa luồng trong Python.

_Hôm nay mình gặp phải chủ đề này khi code Python, có vẻ thời gian dài code JavaScript khiến mình bỏ qua 1 khái niệm quan trọng này. Chủ đề không mới, mình cố gắng diễn giải một cách dễ hiểu, hy vọng các bạn đọc đến đây sẽ tìm được cho mình 1 điều bổ ích gì đó (ít hoặc nhiều), Cảm ơn đã ghé thăm😉😉😉_

<img src="https://cloudgeeks.net/wp-content/uploads/2021/07/process-vs-thread3.png"  width="80%" height="auto">

### 1. Luồng và Tiến trình (Thread - Process) ?

Đây là 2 khái niệm không đặc biệt, bạn có thể được nghe ở mọi ngôn ngữ, ... . Về định nghĩa thì đơn giản thôi, hãy nhớ như này: 1 chương trình đang được hoạt động là 1 **tiến trình** được quản lý bới OS, và **luồng** là một **tiến trình** gọn nhẹ, là đơn vị cơ bản của việc sử dụng CPU, khác với **tiến trình** thì các **luồng** có thể chia sẻ tài nguyên với nhau còn **tiến trình** thì hoàn toàn độc lập.

Các bạn muốn tìm hiểu rõ hơn sự khác biệt thì có thể tham khảo [Bài viết này](https://quantrimang.com/cong-nghe/phan-biet-tien-trinh-va-luong-180105), mình thấy khá đầy đủ.

Mình cũng tìm thấy vài quote (nhiều 👍, còn tại sao thì chúng ta cùng tìm hiểu thêm nhé 😅😅), các bạn có thể tham khảo :

> Chương trình có nhiều luồng sẽ tiết kiệm dc nhiều bộ nhớ hơn so với chạy nhiều tiến trình để cùng hoàn thành một mục đích, công việc nào đó.

> Một tiến trình có thể sinh ra nhiều tiến trình con khác khi thực hiện, luồng thì không

> Lập trình đa luồng ít phức tạp hơn lập trình đa tiến trình

### 2. Luồng thực thi (Thread) và Lập trình đa luồng (Multithreading) ?

OK, tìm hiểu kỹ hơn 1 chút về Thread. Khi chương trình hoạt động, các phương thức trong nó được chỉ định trình tự thực thi theo thời gian, trình tự thực hiện đó được gọi là _Dòng điều khiển_ (flow of control) hoặc _Dòng thực thi_ (flow of execution). Khi chương trình được chạy, OS bố trí cho CPU lần lượt thực hiện các lệnh theo trật tự đã được chỉ định, việc này được thực hiện bởi **scheduler (Bộ lập lịch)**, chuỗi lệnh mà **schedule** có thể quản lý độc lập được gọi là 1 **luồng thực thi (Thread of execution)**.

Có thể hình dung, **luồng thực thi** giống như 1 người công nhân trong dây truyền thực hiện các nhiệm vụ được giao, nếu chỉ có một công nhân thì trong 1 thời điểm thì có thể thực hiện 1 nhiệm vụ, nếu muốn thực hiện nhiều nhiệm vụ đồng thời thì phải sử dụng nhiều công nhân (đa luồng).

#### Mô hình đơn luồng:

Ngay cái tên chúng ta đã mường tượng ra gì đó rồi đúng không ? chương trình với đơn luồng chỉ sử dụng 1 luồng duy nhất, có nghĩa là tại 1 thời điểm chỉ có thể thực hiện 1 lệnh, lệnh tiếp theo chỉ được thực thi khi lệnh trước đó đã kết thúc. Thường được tìm thấy trong lập trình Socket. Với WebServer, tại một thời điểm chỉ có thể phục vụ 1 Client, vì vậy lập trình đơn luồng không phù hợp với WebServer.

#### Mô hình đa luồng:

Mô hình phổ biến hơn, chương trình với đa luồng cho phép tạo ra nhiều **thread** trong 1 **process**. Nó đem lại nhiều ưu điểm hơn so với đơn luồng như: tận dùng tài nguyên hệ thống tốt hơn, hiệu suất tốt hơn, ... , tuy nhiên cũng sẽ có nhược điểm: deadlock, livelock, .... Và **schedule** cho phép có nhiều **thread** chạy song song.

Các bạn muốn tìm hiểu rõ hơn 2 mô hình thì có thể tham khảo [Bài viết này](https://codelearn.io/sharing/da-luong-nhanh-hay-cham).

#### 3. Lập trình đa luồng trong python :

Về cơ bản, Python sẽ thực thi các câu lệnh 1 cách tuần tự, nếu trong trường hợp bạn có 1 vòng lặp, và chẳng may nó vô hạn hay khi gửi HTTP request đến 1 bên khác và phải chờ nó phản hồi nhưng vẫn muốn thực thi các câu lệnh khác. Phương án đưa ra là chúng ta sẽ phải sử dụng đa luồng.

Giờ thì bắt đầu với 1 Ví dụ đơn giản nhé:

```
def showInfo(profile):
    while 1==1:
        print("Thread: {}\n".format(profile))

def Main():
    showInfo('1')
    showInfo('2')

Main()

==== console ====
Profile: Thread 1

Profile: Thread 1

Profile: Thread 1

Profile: Thread 1

Profile: Thread 1
......
```

Kết quả, chúng ta nhận được toàn là `Profile: Thread 1` , không như mong đợi, tại sao ? Bởi vì hàm `showInfo` của '1' sẽ không bao giờ kết thúc.

Vậy để có thể giải quyết vấn đề này (kỳ vọng nhận được `Profile: Thread 1` và `Profile: Thread 2` đều được in ra), chúng ta cần đưa chúng và các thread riêng, vì các thread hoạt động độc lập, nên không cần phải chờ cho hàm của '1' xong mới đến hàm của '2'.

Để khởi tạo được 1 luồng chúng ta cần sử dụng lib "threading", và chương trình trở thành:

```
import threading

def showInfo(profile):
    while 1==1:
        print("Thread: {}\n".format(profile))

def Main():
    p1 = threading.Thread(target=showInfo, args=('1',))
    p1.start()

    p2 = threading.Thread(target=showInfo, args=('2',))
    p2.start()

Main()
==== console ====
Profile: Thread 1
Profile: Thread 2

Profile: Thread 1
Profile: Thread 2

Profile: Thread 1
Profile: Thread 2
......
```

Oke rồi nhỉ ? Cơ bản thôi nhưng hy vọng sẽ giúp các bạn 1 điều gì đó, nhớ tìm hiểu kỹ hơn phần này nếu Python là 1 trong những ngôn ngữ mà bạn thường xuyên sử dụng. Có gì góp ý thì góp ý cho mình để chúng ta cùng tốt hơn nhé, cảm ơn đã đọc.
