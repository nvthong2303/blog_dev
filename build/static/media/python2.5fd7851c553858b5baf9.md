# Cùng học Python - Part 2: Classes và Objects.

_Hi, Chúng ta quay lại với Series cùng học Python nhé, tiếp tục phần trước thì phần này chúng ta sẽ hoàn thành phần Classes and Object nhé, cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

#### 1. Classes & Object:

Tiếp tục par1, hôm nay chúng ta sẽ tìm hiểu về \_\_init\_\_(), Instance variables, Private attributes, Class attributes, Statis methods.

##### 1.3. **init**()

OK, bắt đầu với **\_\_init\_\_()**, khi khởi tạo 1 đối tượng mới từ 1 class, Python sẽ tự động gọi **\_\_init\_\_**() để khởi tạo các thuộc tính của đối tượng, (thường gọi là **under init**). Chúng ta cũng có thể sử dụng nó để khởi tạo các thuộc tính của đối tượng luôn. Khi khởi tạo 1 instance của 1 Class, Python thực hiện 2 việc: Tạo 1 instance mới của Class bằng cách khởi tạo trong bộ nhớ và **\_\_dict\_\_** thành {}, sau đó sẽ gọi **\_\_init\_\_()** để khởi tạo các thuộc tính của đối tượng.

```
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person('Thong', 24)
print(f"I'm {person.name}. I'm {person.age} years old.")
==> I'm Thong. I'm 24 years old.
```

**\_\_init\_\_()** các tham số có thể nhận giá trị mặc định, nó không khởi tạo instance mà chỉ khởi tạo các thuộc tính của instance.

##### 1.4. Instance variables:

Đến **Instance variables**, khác với **Class variables** mà đã từng tìm hiểu ở phần 1, thì instance variables được ràng buộc với một instance cụ thể của lớp. Phân tích ví dụ dưới để hiểu rõ hơn nào :

```
class HtmlDocument:
    # class variable, lưu trữ trong __dict__
    version = 5
    extension = 'html'



home = HtmlDocument()
# lúc này thì instance variables của home rỗng.
home.__dict__ ==> {}
# khác với __dict của class
type(home.__dict__)             ==> <class 'dict'>
type(HtmlDocument.__dict__)     ==> <class 'mappingproxy'>


print(home.extension)
print(home.version)
==> lúc này, Python sẽ tìm kiếm trong home.__dict__ trước,
sau đó không thấy sẽ tìm tiếp trong HtmlDocument.__dict__, ...
Nếu HtmlDocument kế thừa từ lớp cha thì trong trường hợp
không tìm thấy Python sẽ tiếp tục tìm kiếm "sâu" hơn.

# gán biến version cho instance home:
home.version = 6

print(home.__dict__)        ==> {'version': 6}
print(home.version)         ==> 6

# thay đổi class variable:
HtmlDocument.version = 1
print(home.version)      ==> 1
```

Khởi tạo instance variable:

```
class HtmlDocument:
    version = 5
    extension = 'html'

    def __init__(self, name, contents):
        self.name = name
        self.contents = contents

# name và contents chính là những instance variable
home('name', 'contents)
```

**Các Instance variable được ràng buộc với 1 instance cụ thể của 1 Class. Mỗi instance sẽ có \_\_dict\_\_ riêng và các thuộc tính trong đó có thể khác nhau.**

##### 1.5. Private Attributes:

Đến **Private Attributes**, đầu tiên cần nhớ lại tính đóng gói trong OOP. Tính đóng gói cho phép Class ẩn các thuộc tính và phương thức trong nó mà các Class con hoặc instance chỉ có thể tương tác thông qua các phương thức public. OK, có thể hiểu là nếu bạn có những thuộc tính không muốn public thì bạn có thể kiểm soát quyền truy cập vào giá trị của nó để đảm bảo trạng thái của biến.

```
class Counter:
    def __init__(self):
        self.current = 0

    def increment(self):
        self.current += 1

    def value(self):
        return self.current

    def reset(self):
        self.current = 0

# Lớp Counter có 1 thuộc tính là current, mặc định là 0.
Và 3 method có thể tương tác với nó: increment tăng current +1,
value trả về current, reset gán current về lại 0.

counter = Counter()

counter.increment()
counter.increment()
counter.increment()

print(counter.value())      ==> 3

# Ô, vấn đề là từ bên ngoài vẫn có thể truy cập trực tiếp vào current:
counter.current = -999

print(counter.value())      ==> -999
```

Giờ là lúc quan trọng, cần phải có 1 cơ chế nào để để từ bên ngoài không thể truy cập được current chứ nhỉ ? Python không có khái niệm **private** như vài ngôn ngữ OOP khác, thay vào đó Python cung cấp 1 phương pháp để bảo vệ class variable từ bên ngoài, bằng cách thêm tiền tố **\_** vào trước tên biến, điều này có nghĩa là thuộc tính nên tránh truy cập trực tiếp từ bên ngoài (không bị giới hạn, vẫn có thể truy cập từ bên ngoài). Hoặc với **\_\_** thì được koi như là protected. Bởi vì Python có cơ chế **name mangling** sẽ thay đổi tên của biến, làm cho nó khó truy cập từ bên ngoài class.

```
class Counter:
    def __init__(self):
        self.__current = 0

    def increment(self):
        self.__current += 1

    def value(self):
        return self.__current

    def reset(self):
        self.__current = 0

counter = Counter()
print(counter.__current)            ==> lỗi

counter = Counter()
print(counter._Counter__current)    ==> được, nhưng không nên
```

##### 1.6. Class Attributes:

Tiếp đến, **Class Attributes**:

```
class Circle:
    # class attributes
    PI = 3.14159
    x = 10
    circle_list = []
    default_discount = 0

    def __init__(self, radius, x):
        # instance attributes, ~ instance variables
        self.pi = 3.14159
        self.radius = radius
        self.x = 20
        self.circle_list.append(self)

    def area(self):
        return self.pi * self.radius**2

    def circumference(self):
        return 2*self.pi * self.radius


c = Circle(10)
print(c.pi) --> 3.14159
print(Circle.PI) --> 3.14159 (1)

test = Circle()
print(test.x) --> 20
print(Circle.x) --> 10

print(len(Circle.circle_list)) --> 2 (2)
```

OKe, khá đơn giản, vậy khi nào nên sử dụng **class attribute** ? Chúng ta nên sử dụng nó để lưu trữ hàng số của lớp (1), hoặc để theo dõi dữ liệu trên tất cả các instance (2), hoặc đặt giá trị mặc định cho tất cả các instance.

**Tóm lại, class attribute được chia sẻ cho tất cả các instance, để xác định 1 class attribute cần xác định chúng ngoài **init**().**

##### 1.7. Static methods:

Tiếp theo là **Static methods**, như bài viết trước, mình đã nói đến class method, vậy static method khác gì so với class method nhỉ ? Cùng nhớ lại nhé thì method chính là những Function hoặc có thể hiểu là những Action mà các instance có thể thực hiện và thường được ràng buộc với 1 instance, từ đó các instance có thể truy cập và thay đổi các trạng thái của instance. Ngoài ra còn có class method, đây là những method mà các instance có thể truy cập và thay đổi trạng thái của lớp. OK vậy Static method là gì ? Static method là những method không bị ràng buộc bới bất cứ instance nào, nên chúng không thể truy cập và thay đổi trạng thái của lớp hoặc đối tượng. Ngoài ra cũng không cần truyền tham số **self (cls)** vào chúng, chúng thường được sử dụng để định nghĩa các method utilitty hoặc group function. Ví dụ:

```
class className:
    KEVIN = 'K',
    FAHRENHEIT = 'F'
    CELSIUS = 'C'

    @staticmethod
    def celsius_to_fahrenheit(c):
        return 9*c/5 + 32

    @staticmethod
    def fahrenheit_to_celsius(f):
        return 5*(f-32)/9
```

#### Tổng kết phần 1: Classes & Object thì mình cùng notes lại một số điều cần nhớ kỹ nhé:

- Khái niệm, cách khai báo và gọi class trong python.
- Class variable (class attribute) - Instance variable: class variable thì được chia sẻ trong tất cả các instance của class, còn Instance variable có thể hiểu là những biến riêng cho mỗi instance. Private attributes: với cơ chế name mangling (\_).
- \_\_init\_\_() và \_\_dict\_\_: \_\_init\_\_() là phương thức dùng để khởi tạo các instance variable cho instance còn \_\_dict\_\_ là một thuộc tính đặc biệt dùng để lưu trữ các thuộc tính cho các instance.
- Method - Class method - Static method:
  - Method - 1 Function bên trong một class, nó hoàn toàn là 1 Function, nhưng khi gọi nó qua 1 instance của class thì nó sẽ trở thành 1 method, có thể truy cập và thay đổi các instance attribute.
  - Class method - decorator: '@classmethod', có thể truy cập và thay đổi trạng thái của lớp, không truyền self như method.
  - Static method - decorator: '@staticmethod', không thể truy cập và thay đổi instance attribute, không truyền self như method, thường là các method không liên quan đến lớp và các instance cụ thể.

Kết thúc phần 1, cảm ơn các bạn đã đọc, nếu có gì thắc mắc hay góp ý thì liên hệ mình nhé, chúng ta cùng nhau tự học để cải thiện, phần tới chúng ta sẽ cùng học và ôn tập lại những **Special Method** trong Python nhé. ^^

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
