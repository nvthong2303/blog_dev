# Cùng xem Goroutines, channel trong golang là cái thứ gì mà làm mưa làm gió thế nhỉ.

_Hi mọi người, tiếp với bài trước bài này mình sẽ . Cảm ơn đã ghé thăm😉😉😉_

<figure>
    <img src="https://do-an.s3.ap-southeast-2.amazonaws.com/goroutines.jpg"  width="100%" height="auto" margin="auto">
    <figcaption>"slap slap ... ".</figcaption>
</figure>
 

### 1. Goroutines.


Goroutines là 1 tính năng nổi bật, đặc biệt và quan trọng trong golang giúp lập trình concurrency cực kỳ đơn giản, bản chất thì nó là những functon (method) được thực thi một cách độc lập, đồng thời những vẫn có thể giao tiếp được với nhau và chạy trên một lightweight execution thread (luồng thực thi gọn nhẹ). Tại sao lại gọn nhẹ ư ? vì 1 OS thread có kích thước là 2MB trong khi Goroutines chỉ 2KB memory stack (he he).

Qua một vài điểm nổi bật của goroutines nào:

* Goroutines linh hoạt hơn OS thread.
* Kích thước nhỏ hơn.
* Thời gian khởi động nhanh hơn.
* Giao tiếp được với nhau (thông qua các channel).
* Chương trình chính trong golang cũng là 1 Goroutines (Main Goroutines).

Cùng điểm lại một chút về OS thread và so sánh kỹ hơn với goroutines:

- Thread (luồng) thì được quản lý bởi OS còn goroutines quản lý bởi go runtime.
- Thread (luồng) thì có kích thước vùng nhớ là cố định, còn goroutines có thể tùy chỉnh.
- Thread (luồng) khởi tạo và giải phóng tốn nhiều thời gian hơn.
- Thread (luồng) có thể giao tiếp với nhau nhưng phức tạp và trễ cao hơn goroutines.

Code nào:

```
func sayHello(name string){
    for i := 0; i <= 5; i++ {
        fmt.Printf("Hello %s\n", name)
    }
}

func main() {
    // Goroutine
    go sayHello("Viet")
  
    // normal function
    sayHello("Nam")
}

-->
Hello Nam
Hello Nam
Hello Nam
Hello Nam
Hello Nam

Tại sao lại không có "Hello Viet" ? Bởi vì khi call 1 goroutine thì hàm này sẽ trả về ngay lập tức, sau đó thì main goroutines đã kết thúc trước khi các goroutines bên dưới được thực thi.

func sayHello(name string) {
	for i := 0; i <= 5; i++ {
		fmt.Printf("Hello %s\n", name)
	}
}

func main() {
	// Goroutine
	go sayHello("Viet")

	// normal function
	sayHello("Nam")

	time.Sleep(time.Second)
}

--> 
Hello Nam
Hello Nam
Hello Nam
Hello Nam
Hello Nam
Hello Viet
Hello Viet
Hello Viet
Hello Viet
Hello Viet

Đã đúng như mong đợi rồi.
```


__capture variable trong Goroutines :__

Mình có đọc đc trên blog của 200lab 1 bài về capture variable trong Goroutines, đây là 1 vấn đề mà nhiều Gopher gặp phải (mặc dùng mình code Go khoảng 1 năm chưa gặp, có lẽ mình chỉ xoay quanh những vấn đề đơn giản), cùng tìm hiểu nhé.

```
func main() {
	for i := 1; i <= 100; i++ {
		go func() {
			fmt.Println(i)
		}()
	}

	time.Sleep(time.Second)
}

--> vấn đề là gì ? có thể thấy rất nhiều giá trị bị trùng lặp chứ không phải là lần lượt từ 1 -> 100, vì 1 hàm sử dụng biến ở ngoài phạm vi hàm thì biến đó được capture, hay có thể hiểu là một tham chiếu đến biến ở ngoài mà thôi, không phải giá trị. Vì các goroutines không được thực thi ngay dẫn đến giá trị ở bên ngoài thay đổi nên khi thực thi thì giá trị đã bị thay đổi so với thời điểm nó đc call, dẫn đến các giá trị không như mong muốn.
--> output
8
27 
101
32 
32 
32
...

Để thay đổi thì:

func main() {
	for i := 1; i <= 100; i++ {
		go func(value int) {
			fmt.Println(value) // value ở đây độc lập với i ở ngoài
		}(i) // value i được copy ở đây
	}

	time.Sleep(time.Second)
}
```

__Gosched() để force schedule Goroutines :__
 
Lại 1 chủ đề mình lấy từ 200lab blog, Thường thì chúng ta không cần quan tâm đến vấn đề phân bổ tài nguyên giữa các goroutines. 

Ví dụ:
```
func main() {
	go func() {
		for i := 1; i <= 50; i++ {
			fmt.Println("I am Goroutine 1")
		}
	}()

	go func() {
		for i := 1; i <= 50; i++ {
			fmt.Println("I am Goroutine 2")
		}
	}()

	time.Sleep(time.Second)
}

--> output: khả năng cao sẽ là 1 loạt hoặc là "I am Goroutine 1" hoặc là "I am Goroutine 2" in ra 1 loại mới đến chuỗi còn lại, điều này sẽ khiến cho ứng dụng chiếm tài nguyên lớn và không hiệu quả, nghẽn cổ chai (biết vậy thôi chứ mình cũng chưa gặp ^^)

Giải quyết vấn đề này thì có thể sử dụng sleep ở mỗi vòng lặp (hy sinh performance) hoặc sử dụng Gosched() để schedule goroutine ngay lập tức sau mỗi vòng lặp.

func main() {
	go func() {
		for i := 1; i <= 50; i++ {
			fmt.Println("I am Goroutine 1")
			runtime.Gosched()
		}
	}()

	go func() {
		for i := 1; i <= 50; i++ {
			fmt.Println("I am Goroutine 2")
			runtime.Gosched()
		}
	}()

	time.Sleep(time.Second)
}
```

__sync.WaitGroup :__

trở lại với Ví dụ tương tự lúc đầu

```
func main() {
	fmt.Println("Application start")

	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}
	}()

	fmt.Println("Application end")
}

--> như đã biết thì Goroutine main đã kết thúc trước khi thực thi những goroutines bên dưới, chúng ta có thể sử dụng sleep để giải quyết vấn đề này.


Ngoài ra thì có thể sử dụng sync.WaitGroup:

func main() {
    var wg sync.WaitGroup
    fmt.Println("Application start")

    wg.Add(1) // ở đây chỉ gọi 1 goroutine nên sẽ Add(1)
	go func() {
		for i := 0; i < 5; i++ {
			fmt.Println("Goroutines: ", i)
		}

        wg.Done() // báo hiệu goroutines đã chạy xong
	}()

	fmt.Println("Application end")
    wg.Wait()
}
```

... comming soon