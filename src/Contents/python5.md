# Cùng học Python - Part 2: Classes và Objects.

_Hi, Chúng ta quay lại với Series cùng học Python nhé, ở phần trước chúng ta đã cùng tìm hiểu Special Methods và phần này sẽ tìm hiểu về Property, cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

#### 4. Single inheritance:

Phần này chúng ta sẽ tìm hiểu Kế thừa đơn trong Python, overriding method, method super(), cách dùng \_\_slots\_\_ và Abstract class.

##### 4.1. **Kế thừa trong Python**:

Chắc hẳn ai cũng biết kế thừa là gì rồi đúng không, vậy mình sẽ đi luôn vào kế thừa trong Python sẽ như thế nào nha.

```
# lớp Person
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hi, it's {self.name}"


# lớp Employee
class Employee:
    def __init__(self, name, job_title):
        self.name = name
        self.job_title = job_title

    def greet(self):
        return f"Hi, it's {self.name}"

# có thể thấy thuộc tính name và phương thứ greet của class
# Employee giống với class Person

# định nghĩa lại lớp Employee kế thừa từ lớp Person
class Employee(Person):
    def __init__(self, name, job_title):
        self.name = name
        self.job_title = job_title
```

- Inherited terminology (Thuật ngữ kế thừa): Lớp Person là **lớp cha, lớp cơ sở hoặc super class** của lớp con Employee. Lớp con Employee là 1 **derives from, extends hoặc subclasses** của lớp cha Person. Đây là mỗi quan hệ **IS-A**.

- type vs. isinstance:

```
# tiếp phần trên
person = Person('Jane')
print(type(person)) --> <class '__main__.Person'>

employee = Employee('John', 'Python Developer')
print(type(employee)) --> <class '__main__.Employee'>

# =================================================================
person = Person('Jane')
print(isinstance(person, Person))  # True --> instance của 1 class - class đó

employee = Employee('John', 'Python Developer')
print(isinstance(employee, Person))  # True --> instance của class con - class cha
print(isinstance(employee, Employee))  # True --> instance của class - class đó
print(isinstance(person, Employee))  # False --> instance của class cha - class con
```

- issubclass:

```
print(issubclass(Employee, Person)) # True

class SalesEmployee(Employee):
    pass

print(issubclass(SalesEmployee, Employee)) # True
print(issubclass(SalesEmployee, Person)) # True
```

- Tóm lại, kế thừa cho phép 1 lớp sử dụng lại các thuộc tính hoặc phương thức từ lớp khác. Sử dụng **isinstance()** để kiểm tra 1 đối tượng có phải là 1 instance của 1 class hay không, **issubclass()** kiểm tra xem 1 class có phải là class con của class khác hay không.

##### 4.2. **Overriding Method**:

Ghi đề phương thức, chắc các bạn cũng nhớ hoặc biết nó là gì rồi đúng không ? (nghe cái tên cũng hình dung ra nó làm gì rồi mà ^^). Overriding method cho phép 1 lớp con cung cấp 1 cách triển khác cho 1 phương thức cụ thể được cung cấp bởi class cha.

```
class Employee:
    def __init__(self, name, base_pay):
        self.name = name
        self.base_pay = base_pay

    def get_pay(self):
        return self.base_pay

class SalesEmployee(Employee):
    def __init__(self, name, base_pay, sales_incentive):
        self.name = name
        self.base_pay = base_pay
        self.sales_incentive = sales_incentive

john = SalesEmployee('John', 5000, 1500)
print(john.get_pay()) --> 5000

# override method get_pay
class SalesEmployee(Employee):
    def __init__(self, name, base_pay, sales_incentive):
        self.name = name
        self.base_pay = base_pay
        self.sales_incentive = sales_incentive

    def get_pay(self):
        return self.base_pay + self.sales_incentive

john = SalesEmployee('John', 5000, 1500)
print(john.get_pay()) --> 6500

jane = Employee('Jane', 5000)
print(jane.get_pay()) --> 5000
```

- 1 Ví dụ nâng cao (mình lấy từ tutorial xuống ^^), không quá khó hiểu những cố gắng đọc kỹ nhé:

```
class Parser:
    def __init__(self, text):
        self.text = text

    def email(self):
        match = re.search(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+', self.text)
        if match:
            return match.group(0)
        return None

    def phone(self):
        match = re.search(r'\d{3}-\d{3}-\d{4}', self.text)
        if match:
            return match.group(0)
        return None

    def parse(self):
        return {
            'email': self.email(),
            'phone': self.phone()
        }

s = 'Contact us via 408-205-5663 or email@test.com'
parser = Parser(s)
print(parser.parse()) --> {'email': 'email@test.com', 'phone': '408-205-5663'}

# override method phone:
class UkParser(Parser):
    def phone(self):
        match = re.search(r'(\+\d{1}-\d{3}-\d{3}-\d{4})', self.text)
        if match:
            return match.group(0)
        return None

s2 = 'Contact me via +1-650-453-3456 or email@test.co.uk'
parser = UkParser(s2)
print(parser.parse()) --> {'email': 'email@test.co.uk', 'phone': '+1-650-453-3456'}
```

OK, vấn đề ở đây là gì ? ở class **UkParser**, ghi đè phương thức phone(). Instance **parser** gọi phương thức **parse()** từ lớp cha. Đổi lại thì phương thức **parse()** gọi các phương thức **email()** và **phone()**, tuy nhiên thì **parser()** không gọi phương thức **phone()** của lớp cha mà gọi **phone()** của lớp con. Tại sao ? `parser.parse()` Vì bên trong phương thức **parse()**, self của nó là parser là 1 instance của class con (UKParser) nên khi gọi self.**phone()** bên trong **parse()**, Python sẽ tìm kiếm phương thức **phone()** được ràng buộc với instance của class con (UKParse).

- Overriding attributes: Vậy còn ghi đề thuộc tính thì sao nhể ??? tiếp tục ví dụ trên nhá.

```
class Parser:
    phone_pattern = r'\d{3}-\d{3}-\d{4}'

    def __init__(self, text):
        self.text = text

    def email(self):
        match = re.search(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+', self.text)
        if match:
            return match.group(0)
        return None

    def phone(self):
        match = re.search(self.phone_pattern, self.text)
        if match:
            return match.group(0)
        return None

    def parse(self):
        return {
            'email': self.email(),
            'phone': self.phone()
        }


class UkParser(Parser):
    phone_pattern = r'(\+\d{1}-\d{3}-\d{3}-\d{4})'


if __name__ == '__main__':
    s = 'Contact us via 408-205-5663 or email@test.com'
    parser = Parser(s)
    print(parser.parse())

    s2 = 'Contact me via +1-650-453-3456 or email@test.co.uk'
    parser = UkParser(s2)
    print(parser.parse())
```

Dễ hiểu đúng không ? phần này không có gì khó khăn cả nhỉ. 😉😉😉

##### 4.3. **Super()**:

Chắc hẳn ai đã từng đá tí OOP thì không thể nào quên được **super()** 😉😉😉, đây là phương thức để gọi các phương thức, thuộc tính của lớp cha từ lớp con, vào luôn 1 ví dụ nhé:

```
# lớp cha
class Employee:
    def __init__(self, name, base_pay, bonus):
        self.name = name
        self.base_pay = base_pay
        self.bonus = bonus

    def get_pay(self):
        return self.base_pay + self.bonus

# lớp con
class SalesEmployee(Employee):
    def __init__(self, name, base_pay, bonus, sales_incentive):
        self.name = name
        self.base_pay = base_pay
        self.bonus = bonus
        self.sales_incentive = sales_incentive

    def get_pay(self):
        return self.base_pay + self.bonus + self.sales_incentive

# super().__init__
# có thể thấy lớp con có những thuộc tính giống với lớp cha (name, base_pay, bonus)
# để tránh việc lặp lại code, có thể viết lại bằng cách sử dụng super():
class SalesEmployee(Employee):
    def __init__(self, name, base_pay, bonus, sales_incentive):
        super().__init__(name, base_pay, bonus)
        self.sales_incentive = sales_incentive

    def get_pay(self):
        return self.base_pay + self.bonus + self.sales_incentive

# có thể thấy tiếp trong phương thức get_pay() ở lớp con đã có vài logic ở lớp ca
# tránh việc lặp code, có thể viết lại phương thức get_pay() ở lớp con:
class SalesEmployee(Employee):
    def __init__(self, name, base_pay, bonus, sales_incentive):
        super().__init__(name, base_pay, bonus)
        self.sales_incentive = sales_incentive

    def get_pay(self):
        return super().get_pay() + self.sales_incentive
```

Phần này cũng không có gì khó khăn cả, nhớ là tự mình kiểm nghiệm lại phần ví dụ mình đưa ra để nhớ lâu hơn nhé (mình có thói quen đặt log hoặc là đặt debug để xem code nó chạy từng bước như thế nào, nghe có vẻ thủ công nhưng mình thấy thế sẽ hiểu hơn chút so với việc chỉ ngồi ngắm nó qua cái màn hình, các bạn có thể thử).

##### 4.4. **\_\_slots\_\_**:

Chúng ta đi từ Ví dụ nhỏ trước nhé:

```
class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f'Point2D({self.x},{self.y})'
```

Với mỗi instance của class Point2D, đều có \_\_init\_\_ để lưu các thuộc tính. Theo mặc định thì Python sử dụng dict để lưu trữ thuộc tính của instance, điều này cho phép chúng ta thêm nhiều thuộc tính vào instance khi chạy tuy nhiên điều này có thể gây ra tốn kém bộ nhớ nếu Point2D có nhiều instance. Để giải quyết vấn đề này thì Python sinh ra **slots**. Nếu 1 lớp chỉ chứa những thuộc tính instance (cố định hoặc xác định trước), chúng ta có thể sử dụng slots để hướng dẫn Python sử dụng cấu trúc dữ liệu nhẹ hơn thay vì dict. Ví dụ nếu Point2D chỉ có 2 thuộc tính instance, chúng ta có thể chỉ định các thuioojc tính trong slots (1 tuple - 1 cấu trúc dữ liệu mình đã nhắc đến trong bài Python1, các bạn có thể xem lại) như sau:

```
class Point2D:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f'Point2D({self.x},{self.y})'

point = Point2D(0, 0)
print(point.__dict__) --> AttributeError: 'Point2D' object has no attribute __dict__
print(point.__slots__) --> ('x', 'y')

# không thể thêm nhiều thuộc tính vào 1 instance một cách linh hoạt như bình thường
point.z = 0 --> AttributeError: 'Point2D' object has no attribute 'z'

# nhưng vẫn có thể thêm thuộc tính vào lớp
Point2D.color = 'black'
```

Trong kế thừa thì sao nhỉ ? thử nhé

```
class Point2D:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f'Point2D({self.x},{self.y})'


class Point3D(Point2D):
    def __init__(self, x, y, z):
        super().__init__(x, y)
        self.z = z


point = Point3D(10, 20, 30)
print(point.__dict__) --> 30
```

Lý giải: lớp Point3D không có slots, chỉ có thuộc tính \_\_dict\_\_, khi này lớp con Point3D sử dụng các slots có sẵn từ lớp cha và sử dụng dict instance. Nếu muốn lớp con Point3D sử dụng slots:

```
class Point3D(Point2D):
    __slots__ = ('z',)

    def __init__(self, x, y, z):
        super().__init__(x, y)
        self.z = z
```

Thêm 1 ví dụ:

```
class Shape:
    pass


class Point2D(Shape):
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y


# use both slots and dict to store instance attributes
point = Point2D(10, 10)
print(point.__slots__) --> ('x', 'y')
print(point.__dict__) --> {}
print(point.x) --> 10
print(point.y) --> 10

# can add the attribute at runtime
point.color = 'black'
print(point.__dict__) --> {'color': 'black'}
```

Tóm lại, **slots** có nhiệm vụ hướng dẫn Python không sử dụng dict để lưu trữ thuộc tính nữa mà sử dụng **slots** nhằm mục đích tối ưu hóa bộ nhớ.

##### 4.5. **Abstract class**:

Lớp trìu tượng ? cùng tìm hiểu **abstract class** trong Python nhé. Nhắc lại về tính trìu tượng trong OOP chút nhỉ - Tính trìu tượng cho phép đối tượng loại bỏ những thuộc tính, phương thức rườm rà, phức tạp mà chỉ tập chung vào những vấn đề chính (keyword: abstract, interface, ...). Còn lớp trìu tượng ? Lớp trìu tượng là lớp không thể khởi tạo instance được nhưng vẫn có thể tạo ra các lớp con kế thừa từ nó. Nó thường được dùng để tạo ra **"blueprint"** cho các class khác. Phương thức trìu tượng ? Phương thức trìu tượng là phương thức mà không có phần **"implementation"**, 1 lớp trìu tượng có thể có hoặc không các phương thức trìu tượng.

Python không cung cấp cơ chế định nghĩa lớp trìu tượng trực tiếp, nhưng nó cho phép định nghĩa các lớp trìu tượng thông quá 1 module **abc**.

```
from abc import ABC, abstractmethod

class AbstractClassName(ABC):
    @abstractmethod
    def abstract_method_name(self):
        pass
```

Ví dụ về lớp trìu tượng trong Python: Giả sử chúng ta có 1 bài toán: Tính lương cho nhân viên: nhân viên full-time và nhân viên partime, cần tính ra bảng lương với tên và lương của họ. Để mô hình hóa chúng ta sẽ có 4 class: Employee, FulltimeEmployee, PartimeEmployee, Payroll.

```
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @abstractmethod
    def get_salary(self):
        pass

# ===========================
class FulltimeEmployee(Employee):
    def __init__(self, first_name, last_name, salary):
        super().__init__(first_name, last_name)
        self.salary = salary

    def get_salary(self):
        return self.salary

# ===========================
class PartimeEmployee(Employee):
    def __init__(self, first_name, last_name, worked_hours, rate):
        super().__init__(first_name, last_name)
        self.worked_hours = worked_hours
        self.rate = rate

    def get_salary(self):
        return self.worked_hours * self.rate

# ===========================
class Payroll:
    def __init__(self):
        self.employee_list = []

    def add(self, employee):
        self.employee_list.append(employee)

    def print(self):
        for e in self.employee_list:
            print(f"{e.full_name} \t ${e.get_salary()}")


payroll = Payroll()

payroll.add(FulltimeEmployee('John', 'Doe', 6000))
payroll.add(FulltimeEmployee('Jane', 'Doe', 6500))
payroll.add(HourlyEmployee('Jenifer', 'Smith', 200, 50))
payroll.add(HourlyEmployee('David', 'Wilson', 150, 100))
payroll.add(HourlyEmployee('Kevin', 'Miller', 100, 150))

payroll.print()

# output:
John Doe         $6000
Jane Doe         $6500
Jenifer Smith    $10000
David Wilson     $15000
Kevin Miller     $15000
```

Có thể thấy chúng ta nên sử dụng **abstract class** trong trường hợp một số class có liên qua chặt chẽ với nhau (FulltimeEmployee và PartimeEmployee) với cả 2 class con của Employee đều có chung thuộc tính **full_name**.

**Python Protocol**: tìm hiểu một chút về giao thức trong Python - cách để xây dựng các **implicit interface (interface ngầm)**.

```
from typing import List, Protocol

# kế thừa từ lớp Protocol với 2 thuộc tính số lượng và giá cả
class Item(Protocol): # (2)
    quantity: float
    price: float

# định nghĩa class Product bao gồm tên, số lượng, giá
class Product:
    def __init__(self, name: str, quantity: float, price: float):
        self.name = name
        self.quantity = quantity
        self.price = price

# hàm tính tổng giá trị của danh sách Item
# để ý thấy nó chỉ sử dụng thuộc tính số lượng và giá
# sủ dụng Item (2) để hàm này trở nên linh hoạt hơn
# có thể truyền bất cứ thằng nào vào hàm này miễn là nó có chứa 2 thuộc tính số lượng và giá cả.
def calculate_total(items: List[Item]) -> float:
    return sum([item.quantity * item.price for item in items])

# calculate total a product list
total = calculate_total([
    Product('A', 10, 150),
    Product('B', 5, 250)
])

print(total)

# OK, 2 class Product và Stock không cần kế thừa từ Item() nhưng vẫn có thể truyền vào hàm calculating_total()
# đây được gọi là duck typing trong Python
class Stock:
    def __init__(self, product_name, quantity, price):
        self.product_name = product_name
        self.quantity = quantity
        self.price = price

total = calculate_total([
    Stock('Tablet', 5, 950),
    Stock('Laptop', 10, 850)
])

print(total)
```

- Thêm một chút: trong **duck typing**, các method và property của 1 instance sẽ xác định loại instance đó chứ không phân loại rõ ràng instance.
  > duck typing được lấy cảm hứng từ duck test:
  >
  > > If it walks like a duck and its quacks like a duck, then it must be a duck
  > >
  > > > (Nếu nó đi như 1 con vịt và kêu quạc quạc như 1 con vị thì nó phải là 1 con vịt)

Kết thúc bài Kế thừa đơn ở đây. Phần này đa số là lý thuyết cơ bản và dễ tiếp cận nhưng đừng đánh giá thấp chúng, quan trọng đó 🙂🙂. Rất vui vì các bạn đã đọc, có gì góp ý hay chia sẻ thì liên hệ trực tiếp với mình nhé ^^.

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
