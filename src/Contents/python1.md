# Cùng học Python - Part 1.

_Hi, đợt này mình join dự án sử dụng Python, mặc dù đã học trước đó nhưng nó cơ bản qué với lâu không dùng đến nên mình quyết định dành cuối tuần để làm 1 list ôn tập cũng như củng cố kỹ năng với Python dưới góc nhìn của một người thường xuyên sử dụng JavaScript, cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

### 1. Python và các điều cần nhớ.

Đầu tiên, Python là một ngôn ngữ lập trình hướng đối tượng (OOP), cú pháp đơn giản, mạnh mẽ và sở hữu cộng đồng hỗ trợ cực kỳ lớn mạnh. Mình từng thấy Python dùng để phát triển phần mềm, phát triển các ứng dụng AI, Machine Learning, xử lý dữ liệu lớn, phát triển game, viết shellScript, ... Quá tởm, đâu cũng thấy mặt 😬😬. Bỏ qua cài đặt môi trường, cú pháp hay "hello world" nhé, mình sẽ bỏ qua bước này, các bạn muốn tìm hiểu từ đầu thì lên mạng search chắc chắn là ra rất nhiều kết quả 😅😅😅.

Sau đây là vài topic mà khi tìm hiểu một ngôn ngữ mình thường tìm hiểu và note lại với Python:

- Python là ngôn ngữ lập trình cấp cao, thông dịch (mình sẽ viết 1 bài về phần này, nhớ là Python, JavaScript, ... là thông dịch còn Golang, C, C++, ... là biên dịch).
- Python là ngôn ngữ lập trình hướng đối tượng, nhưng hỗ trợ lập trình hướng hàm (Functional Progamming), hướng thủ tục (Procedural Programming).
- Python sẽ chậm hơn Java, C, C#, ... (đơn giản, tại thông dịch thì thường sẽ chậm hơn biên dịch khi hoạt động mà).
- Python là ngôn ngữ đơn luồng, nhưng hỗ trợ đa luồng qua module **threading** Mình đã có 1 bài viết về phần này ([Đa luồng trong Python](https://techie-guy.thong2303.io.vn/blog/multithread-python)), đa tiến trình qua module **multi-processing** (wow 🤔🤔).
- Python sẽ quản lý các module và thư viện bằng pip (tương tự npm trong JS).
- Virtual Environment, trong python cho phép khởi tạo môi trường ảo độc lập để cài đặt và sử dụng các module và thư viện khác nhau.
- requirements.txt, Conda, pipenv, pyenv, Anaconda, ... Mình sẽ đề cập dần dần.

### 2. Kiểu dữ liệu trong Python.

<div>
<img src="https://media.geeksforgeeks.org/wp-content/uploads/20191023173512/Python-data-structure.jpg"  width="60%" height="auto" margin="auto">
</div>

Trong Python hỗ trợ nhiều kiểu dữ liệu:

| Datatype    | Description                                                                                                                                                                                                  | Example                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| **int**     | Interger.                                                                                                                                                                                                    | 23, 99, 1000, ...                              |
| float       | Float.                                                                                                                                                                                                       | 1.9, 2.3, 124.54, ...                          |
| complex     | Complex number.                                                                                                                                                                                              | 100+3j, 9j, ....                               |
| _str_       | String.                                                                                                                                                                                                      | "thong", "python", "vietnam", ...              |
| **list**    | List (~ Array in JS).                                                                                                                                                                                        | [1,2,3,4,5,6], ...                             |
| **tuple**   | Tập hợp có thứ tự và không thể thay đổi.                                                                                                                                                                     | (1,2,3,4), ("hello","john"), ...               |
| **dict**    | Tập hợp các dữ liệu dưới dạng key-value (~ Object in JS).                                                                                                                                                    | {1:"first name",2:"last name", "age":33}, ...  |
| set         | Tập hợp không có thứ tự, không thể thay đổi (nhưng vẫn có thể thêm, xóa các phần tử cụ thể nhưng không thể thay đổi chúng), không được đánh index và mỗi giá trị là duy nhất.                                | {"thong", "hust", }, ...                       |
| frozen      | Tương tự **set** nhưng không thể thêm hoặc xóa, frozen là **bất biến**.                                                                                                                                      | frozenset({"geeks", "for", "geeks"}), ...      |
| range       | Dùng để tạo 1 dãy số nguyên.                                                                                                                                                                                 | list(range(5)) --> [0,1,2,3,4]                 |
| **boolean** | Boolean.                                                                                                                                                                                                     | True, False                                    |
| bytes       | Kiểu dữ liệu dạng dãy bytes bất biến, thường dùng lưu bit nhị phân.                                                                                                                                          | b"Geeks", ...                                  |
| bytearray   | Kiểu dữ liệu dạng dãy bytes có thể thay đổi.                                                                                                                                                                 | bytearray(4), bytearray(b'Hello, World!'), ... |
| memoryview  | Kiểu dữ liệu cho phép làm việc với dữ liệu nhị phân nhưng không sao chép nó vào bộ nhớ mới. Thay vì sao chép dữ liệu, memoryview cho phép bạn tạo một "cửa sổ" trên dữ liệu đã có để xem và thao tác với nó. | view = memoryview(b'Hello, World!'), ...       |
| **None**    | Kiểu dữ liệu đặc biệt, chỉ có 1 giá trị "None".                                                                                                                                                              | None                                           |

OK, rất nhiều kiểu dữ liệu nhỉ, so với JS (String, Number, BigInt, Boolean, Undefined, Null, Symbol, Object (gồm Array, Object, Date)) và Golang (Basic type - number, string, boolean. Aggregate type - Array, Struct. Reference type - pointer, slice, maps, function, channels. Interface type). Chà, được ôn lại data type của cả JavaScript và Golang luôn, mình sẽ bổ sung bài viết cụ thể hơn cho 2 topic này. Nhưng đối với lập trình viên phát triển phần mềm thì cần lưu ý những kiểu cơ bản như: **int**, **str**, **boolean**, **dict**, **list**, **tuple**, **float**, **set** cùng với các thuộc tính đi kèm của chúng thôi, nhưng cũng phải nhớ các kiểu còn lại, có thể trong các buổi phỏng vấn bạn nêu ra được thì có thể đó sẽ là điểm cộng so với việc học một cách qua loa 🤣🤣.

Lưu ý cái này, Python là một ngôn ngữ động nên khi khai báo biến chúng ta không cần khai báo kiểu cho nó mà có thể gán giá trị luôn (giống với JavaScript nhưng JavaScript cần keyword: "var", "let" hoặc "constant". Còn trong Go thì cần phải xác định cả kiểu dữ liệu để khai báo biến). Về phạm vi của biến thì chúng cũng tương tự như trong JavaScript.

### 3. Vài cú pháp.

Dĩ nhiên trong phần này mình sẽ bỏ qua các cú pháp đã quá đỗi quen thuộc như forLoop, if...else.., while khai báo function. Mình sẽ điểm qua vài cú pháp mà hơi khác so với JavaScript thôi nhớ 😋😋😋.

- Lambda function:

```
# python
x = lambda a, b : a * b
print(x(5, 6))
# output => 30

# js
const square = (x) => x ** 2;
```

- Iterator vs Iterable: khái niệm này liên quan đến việc lặp dữ liệu.

  - Một đối tượng chứa một chuỗi có thể lặp qua (list, tuple, dict, str) thì được gọi là iterable.
  - Một Iterator là một đối tượng chứa một dãy giá trị và duyệt qua chúng một cách tuần tự. Iterator được tạo từ một Iterable thông qua hàm iter(). Iterator có hai phương thức chính: **iter**() và **next**(). Phương thức **iter**() trả về chính nó, trong khi **next**() trả về giá trị tiếp theo trong dãy. Khi không còn giá trị nào để trả về, Iterator sẽ ném ra một ngoại lệ StopIteration, để biểu thị rằng việc lặp qua đã hoàn thành.

  ```
  my_list = [1, 2, 3, 4]
  my_iterator = iter(my_list)
  print(next(my_iterator))  # In ra 1
  print(next(my_iterator))  # In ra 2
  ```

- Cú pháp for:

```
# python
for item in iterable:
    # do something

// js
for (const key in object) {
    // do something
}

for (const item of iterable) {
    // do something
}
```

- Cú pháp if...else...:

```
# python
if condition1:
    # do something
elif condition2:
    # do something
else:
    # do something

// js
if (condition1) {
    // do something
} else if (condition2) {
    // do something
} else {
    // do something
}
```

- Không **";"**, không dùng **{}** để đánh dấu scope, không có toán tử ++, --, ...
- Dĩ nhiên thì mỗi ngôn ngữ đều có cú pháp khác nhau, trên đây là những khác biệt chính ở góc độ một lập trình viên JavaScript mà mình thấy cần phải lưu ý 😙😙😙.

### 4. Hướng đối tượng trong Python.

Giờ thì đến phần quan trọng nè. Thời gian dài lập trình với JavaScript thì kiến thức về OOP của mình gần như về mo, cùng ôn tập lại 1 chút nhé.

Đầu tiên, dĩ nhiên là 4 tính chất trong OOP rồi:

1. Tính đóng gói (Ecapsulation):
<!-- Ẩn đi các thông tin bên trong một đối tượng, chỉ cho phép các đối tượng khác truy cập hoặc thay đổi thông qua các phương thức công khai được cung cấp (keyword: Private, Protected, Public, ...). -->

2. Tính kế thừa (Inheritance):
<!-- Cho phép 1 lớp (lớp con) kế thừa các thuộc tính và phương thức của lớp khác (lớp cha), lớp con có thể mở rộng các thành phần được kế thừa hoặc bổ sung thêm các thuộc tính và phương thức mới (keyword: extends, super, override ...) -->

3. Tính đa hình (Polymorphism):
<!-- Cho phép các đối tượng khác nhau thực thi các phương thức giống nhau theo những cách khác nhau (keyword: overriding, overloading, ...). -->

4. Tính trừu tượng (Abstraction):
<!-- Cho phép đối tượng loại bỏ những thuộc tính, phương thức rườm rà, phức tạp mà chỉ tập chung vào những vấn đề chính (keyword: abstract, interface, ...). -->

Tiếp theo, không thể thiếu được các định nghĩa quan trọng trong lập trình OOP: Class, Object, Property, Method, Interface, ...

<!-- 1. Class: Là một mô hình hoặc khuôn mẫu để khởi tạo đối tượng, định nghĩa các thuộc tính và phương thức chung cho các đối tượng thuộc lớp đó.

2. Object: Đối tượng, là một thể hiện của một lớp, bao gồm những thuộc tính và phương thức của lớp tương ứng.

3. Thuộc tính, phương thức: thuộc tính thể hiện các thông tin, đặc điểm của đối tượng. Phương thức là những hành động mà đối tượng có thể thực hiện.

4. Interface: Là một khuôn mẫu mà một lớp hoặc đối tượng phải tuân thủ. Định nghĩa các phương thức mà lớp hoặc đối tượng sẽ có (làm gì), và những lớp thực thi interface sẽ định nghĩa chi tiết các phương thức đó (làm như thế nào). -->

Không thể không nhắc đến SOLID, thật ra mình không thể nhớ chính xác chúng là gì, như thế nào, koi như ôn tập lại luôn (Phần này nên ở một bài khác, mình hơi loãng quá mất rồi 🤣🤣).

<!-- - S (Single Responsibility Principle - SRP): Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất).
- O (Open/Closed Principle - OCP): Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó (open for extension but closed for modification).
- L (Liskov Substitution - LSP): Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
- I (Interface Segregation - ISP): Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể.
- D (Dependency Inversion Principle - DIP):
    - Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
    - Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation). -->

Quay lại chủ đề chính nào, Hướng đối tượng trong Python. Mình dựa trên khóa Python Tutorial trên trang chủ của Python để viết phần này, mình sẽ chia làm 10 phần nhỏ
Classes and Object, Special methods, Property, Single inheritance, Enumeration, SOLID principles, Multiple inheritance, Descriptors, Metaprogramming, Exceptions.

À, để đọc phần này có value, thì bạn nên là người đã từng tiếp xúc lập trình hướng đối tượng, nếu không sẽ gặp 1 chút khó khăn đó ^^, mình sẽ cố gắng trình bày một cách dễ hiểu.

#### 1. Classes & Object:

**Lập trình hướng đối tượng trong python**. Cùng làm quen bằng cách phân tích 1 Ví dụ dưới nhé.

```
# khai báo class
class Person:
    pass

# định nghĩa đối tượng từ 1 class
person = Person()

# thêm thuộc tính
person.name = 'thong'
```

```
# định nghĩa và khởi tạo một lớp với các thuộc tính và phương thức
class Person:
    # Define class attributes
    counter = 0

    def __init__(self, name, age):
        self.name = name
        self.age = age
        Person.counter += 1

    # instance methods
    def greet(self):
        return f"Hi, it's {self.name}."

    # class method (0)
    @classmethod
    def create_anonymous(cls):
        return Person('Anonymous', 22)

    # static method (3)
    @staticmethod
    def celsius_to_fahrenheit(c):
        return 9 * c / 5 + 32


```

- self: Đại diện cho lớp (~ this trong JavaScript ấy).
- \_\_init\_\_: Phương thức khởi tạo các thuộc tính của lớp.

- Trong đó:
  - instance method: phương thức được liên kết với một đối tượng cụ thể, hiểu là nó sẽ truy cập và làm việc với các thuộc tính của đối tượng đó (trong ví dụ thì là self.name đó). Gọi thông qua đối tượng (1).
  - class method: phương thức hoạt động trên toàn bộ lớp và các lớp con, không thể truy cập các thuộc tính của các đối tượng. Gọi trực tiếp từ lớp (2). Đối số đầu tiên của phương thức loại này chính là lớp đó (quy ước là **cls**), sử dụng **@classmethod** để đánh dấu 1 class method (0) và có quyền truy cập các thông tin của lớp (class attributes, method).
  - static method: phương thức tĩnh, không liên kết với một đối tượng cụ thể nào, không truy cập hoặc thay đổi trạng thái của đối tượng. Nó không cần biết về lớp và đối tượng (3). Được gọi trực tiếp từ lớp (4).

```
# định nghĩa đối tượng
person = Person('Thong', 23)

# person.name ==> 'Thong'
# person.greet ==> "Hi, it's Thong" (1)

p1 = Person('John', 25)
p2 = Person('Jane', 22)
# Person.counter ==> 2

anonymous = Person.create_anonymous() (2)
# anonymous.name ==> Anonymous

f = TemperatureConverter.celsius_to_fahrenheit(30) (4)
# f ==> 86
```

- Single inheritance (kế thừa đơn): một lớp (lớp con) có thể kế thừa từ 1 lớp khác (lớp cha), lớp con có thể truy cập các thuộc tính và phương thức của lớp cha. Ví dụ dưới thì class **Employee** đã kế thừa lại lớp **Person**, bên trong hàm **\_\_init\_\_** của **Employee** đã gọi lại **\_\_init\_\_** của class **Person** thông qua **super()**. **super()** cho phép lớp con truy cập 1 phương thức của lớp cha (Dễ hiểu phải không ^^). Tương tự với phương thức greet cũng vậy.

```
class Employee(Person):
    def __init__(self, name, age, job_title):
        super().__init__(name, age)
        self.job_title = job_title

    def greet(self):
        return super().greet() + f" I'm a {self.job_title}."

###
employee = Employee('John', 25, 'Python Developer')
print(employee.greet()) ==> Hi, it's John. I'm a Python Developer.
```

**Object**: một đối tượng là 1 container chứa các functionality và data. Data thể hiện đối tượng tại 1 thời điểm cụ thể, nên có thể koi là trạng thái của đối tượng (trong Python sử dụng các thuộc tính để mô hình hóa trạng thái của một đối tượng). Functionality thì thể hiện các phương thức của đối tượng (trong Python sử dụng các hàm để mô hình hóa các hành vi của đối tượng) ==> một đối tượng là 1 container chứa phương thức và trạng thái. Vậy nên 1 hàm liên kết với 1 đối tượng thì được koi là phương thức của đối tượng đó. Và mỗi đối tượng của 1 lớp được koi là 1 instance của lớp đó. Hay là một lớp là 1 bản thiết kế chi tiết để tạo ra các đối tượng.

```
class Person:
    pass

person = Person()

# tên và địa chỉ bộ nhớ của class:
print(person) ==> <__main__.Person object at 0x000001C46D1C47F0>

# id định danh duy nhất, định danh class trong python:
print(id(person)) ==> 1943155787760

# kiểm tra 1 đối tượng có phải là một thể hiện của một lớp hay không:
print(isinstance(person, Person)) ==> True
```

- Một lớp cũng là 1 đối tượng trong Python, hay nói cách khác thì mọi thứ trong Python đều là 1 đối tượng bao gồm cả các lớp (hơi trừu tượng nhể).

```
# khi định nghĩa 1 class Person thì Python tự động tạo 1 đối tượng tên là Person,
# có thuộc tính, VD lấy tên của đối tượng Person:
print(Person.__name__) ==> Person

# loại của đối tượng Person
print(type(Person)) ==> <class 'type'>
```

##### 1.1. class variable:

**Variable trong class**: Các **class variable** là các variable được liên kết với class, mọi class con hoặc các instance của class đều truy cập được chúng. Có thể truy cập các **class variable** đó trực tiếp từ class hoặc qua phương thức **getattr**. **class variable** chính là những thuộc tính của instance lớp. Python là ngôn ngữ động (phía trên có nhắc đến), có thể gán **class variable** khi class đang chạy.

```
class HtmlDocument:
    extension = 'html'
    version = '5'

print(HtmlDocument.extension) ==> html
print(HtmlDocument.version) ==> 5

extension = getattr(HtmlDocument, 'extension')
version = getattr(HtmlDocument, 'version')
print(extension) ==> html
print(version) ==> 5

# đặt giá trị cho class variable
HtmlDocument.media_type = 'text/html'
print(HtmlDocument.media_type) ==> 'text/html'

setattr(HtmlDocument, media_type, 'text/html')
print(HtmlDocument.media_type) ==> 'text/html'

# xóa class variable
delattr(HtmlDocument, 'version')
del HtmlDocument.version
```

- Python lưu trữ các **class variable** trong **\_\_dict\_\_**, Không thể thay đổi **\_\_dict\_\_** trực tiếp mà phải qua các phương thức **setattr**, ...

```
pprint(HtmlDocument.__dict__)
==> mappingproxy({'__dict__': <attribute '__dict__' of 'HtmlDocument' objects>,
              '__doc__': None,
              '__module__': '__main__',
              '__weakref__': <attribute '__weakref__' of 'HtmlDocument' objects>,
              'extension': 'html',
              'media_type': 'text/html',
              'version': '5'})
```

- **\_\_dict\_\_** chứa 3 class variable: **extension**, **media_type**, **version**
  cùng với các class variable mặc định khác.

- **Callable class attributes**: Thuộc tính lớp được gọi, thuộc tính của lớp có thể là bất kỳ đối tượng nào, kể cả 1 function. Nên nếu thêm 1 function vào class, nó sẽ trở thành 1 thuộc tính của lớp, và ...

```
class HtmlDocument:
    extension = 'html'
    version = '5'

    def render():
        print('Rendering the Html doc...')


pprint(HtmlDocument.__dict__)
==> mappingproxy({'__dict__': <attribute '__dict__' of 'HtmlDocument' objects>,
              '__doc__': None,
              '__module__': '__main__',
              '__weakref__': <attribute '__weakref__' of 'HtmlDocument' objects>,
              'extension': 'html',
              'render': <function HtmlDocument.render at 0x0000010710030310>,
              'version': '5'})
Rendering the Html doc...
```

Tóm lại: **Một lớp là một đối tượng, là một instance của kiểu Class. Class variable là những thuộc tính của đối tượng Class.**

##### 1.2. class method:

**Method trong Class**: Các **class method** là một function được ràng buộc với 1 instance của class. Ví dụ dưới thì send() là một Function của class Request.

```
class Request:
    def send():
        print('Sent')

Request.send() ==> Sent
print(Request.send) ==> <function Request.send at 0x00000276F9E00310>
print(type(Request.send)) ==> <class 'function'>
```

OK, Phần này quan trọng, cần tập trung này. Có thể thấy **http_request.send** không phải là 1 Function như **Request.send**. Vậy tại sao ?

```
http_request = Request()

print(http_request.send) ==> <bound method Request.send of <__main__.Request object at 0x00000104B6C3D580>>

print(type(Request.send) is type(http_request.send)) ==> False

print(type(http_request.send))  ==> <class 'method'>
print(type(Request.send))  ==> <class 'function'>
```

Bởi vì **Request.send** là một function còn **http_request.send** lại là một method, vậy tại sao ? 🤯🤯🤯 Vì khi định nghĩa 1 function trong 1 class thì nó là 1 function. Nhưng khi gọi hàm đó qua một đối tượng của class thì nó lại là 1 method. Do đó một phương thức chính là một hàm được ràng buộc với một instance của class.

```
http_request.send()
==> TypeError: send() takes 0 positional arguments but 1 was given
```

Tại sao lại lỗi ? Là bởi vì **http_request.send** là một method đã được ràng buộc với đối tượng **http_request** nên Python luôn ngầm chuyển đối tượng đó thành đối số đầu tiên của phương thức đó. Nên cần sửa class Request sao cho Function send() chấp nhận các đối số:

```
class Request:
    def send(*args):
        print('Sent', args)


Request.send() ==> Sent ()

http_request.send() ==> Sent (<__main__.Request object at 0x000001374AF4D580>,)
```

Trong trường hợp này, **method send()** nhận một đối số truyền vào là một đối tượng **http_request**, là đối tượng mà nó bị ràng buộc.

```
print(hex(id(http_request))) ==> 0x1ee3a74d580
http_request.send() ==> Sent (<__main__.Request object at 0x000001EE3A74D580>,)
```

Đối tượng **http_request** cũng chính là đối tượng mà Python truyền cho **send** vì chúng có cùng địa chỉ bộ nhớ, nên có thể truy cập instance của class làm đối số đầu tiên bên trong **send**, nên 2 lệnh sau tương đương

```
http_request.send() ==> Sent (<__main__.Request object at 0x000001EE3A74D580>,)

Request.send(http_request) ==> Sent (<__main__.Request object at 0x000001EE3A74D580>,)
```

Vì lý do này, một method của đối tượng 1 class luôn có 1 đối tượng làm tham số đầu tiên, theo quy ước thì nó là **self**, tương tự như **this** trong JavaScript (có thể hiểu vậy):

```
class Request:
    def send(self):
        print('Sent', self)
```

**method** chính là 1 instance của **class method**, một **method** có đối số đầu tiên là **self** chính là đối tượng mà nó ràng buộc. **Trong Python, khi định nghĩa 1 Function bên trong một class, nó hoàn toàn là 1 Function, Nhưng khi gọi nó qua 1 instance của class thì nó sẽ trở thành 1 method. Do đó method là một Function được ràng buộc với 1 instance của một lớp.** (hãy hiểu đơn giản, khi một hàm được gọi qua 1 đối tượng của 1 class, thì nó là 1 method)

Đến đây thôi, muộn ròi mình đi ngủ mai còn đi làm, mình sẽ lên tiếp phần sau sớm nhất, cảm ơn các bạn đã đọc. 😁😁😁

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
