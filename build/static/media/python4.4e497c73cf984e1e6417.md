# Cùng học Python - Part 2: Classes và Objects.

_Hi, Chúng ta quay lại với Series cùng học Python nhé, ở phần trước chúng ta đã cùng tìm hiểu Special Methods và phần này sẽ tìm hiểu về Property, cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

#### 3. Property:

Phần này chúng ta sẽ tìm hiểu lớp Property, cách sử dụng Property để tạo Property của một lớp (@@), sử dụng **@property decorator**, read-only property, delete property.

##### 3.1. **property**:

Getter / Setter: getter trả về giá trị của 1 property, setter thiết lập giá trị cho một property. Cùng với 1 Ví dụ và phân tích:

```
class Person:
    # định nghĩa 2 thuộc tính
    def __init__(self, name, age):
        self.name = name
        self.age = age


john = Person('John', 18)

# khi gán:
john.age = -1  --> đúng về mặt kỹ thuật nhưng không hợp lý về mặt ngữ nghĩa


# --> sử dụng getter / setter
class Person:
    def __init__(self, name, age):
        self.name = name
        self.set_age(age)

    def set_age(self, age):
        if age <= 0:
            raise ValueError('The age must be positive')
        self._age = age

    def get_age(self):
        return self._age

john = Person('John', 18)
john.set_age(-19) --> ValueError: The age must be positive
```

Tuy nhiên nếu lớp Person đã sử dụng 1 thời gian, giờ bạn mới cập nhật thêm **getter / setter** thì sao ??? vậy phần code liên quan đến class Person sẽ không còn hoạt động đúng nữa. Để có thể đạt được khả năng tương thích ngược, chúng ta cần sử dụng **property() class** cho lớp Person. **property() class** là gì ?

- **property() class** trả về một property của một Object, bao gồm:
  - **fget** là một hàm để lấy giá trị của thuộc tính hoặc phương thức getter.
  - **fset** là một hàm để đặt giá trị của thuộc tính hoặc phương thức setter.
  - **fdel** là một hàm để xóa thuộc tính.
  - **doc** là một chuỗi documents, ...

```
# cú pháp property() class
property(fget=None, fset=None, fdel=None, doc=None)


class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def set_age(self, age):
        if age <= 0:
            raise ValueError('The age must be positive')
        self._age = age

    def get_age(self):
        return self._age

    age = property(fget=get_age, fset=set_age)

# giải thích: khởi tạo 1 lớp property và gán đối tượng cho thuộc tính age
# age trên là 1 property() class, không phải 1 instance.

# Person.age là một property class:
print(Person.age) --> <property object at 0x000001F5F5149180>

john = Person('John', 18)
print(john.__dict__) --> {'_age': 18, 'name': 'John'}
# có thể thấy john.__dict__ không có age, chỉ có _age, khi khởi tạo instance,
# set_age() được gọi, và gán age cho _age.

john.age = 19
# Python kiểm tra age trong john.__dict__, không thấy nó sẽ tiếp tục tìm
# trong Person.__dict__.

print(Person.__dict__)
--> output:
mappingproxy({'__dict__': <attribute '__dict__' of 'Person' objects>,
              '__doc__': None,
              '__init__': <function Person.__init__ at 0x000002242F5B2670>,
              '__module__': '__main__',
              '__weakref__': <attribute '__weakref__' of 'Person' objects>,
              'age': <property object at 0x000002242EE39180>,
              'get_age': <function Person.get_age at 0x000002242F5B2790>,
              'set_age': <function Person.set_age at 0x000002242F5B2700>})

# vẫn không thấy age, nên nó sẽ gọi property object age.
```

- Tóm lại, khi gọi john.age = 19, Python sẽ gọi fset(), và đối số của nó là set_age(). Bằng cách sử dụng **property() class**, chúng ta có thể thêm thuộc tính vào lớp trong khi vẫn đảm bảo tính tương thích ngược. Hãy hiểu là property class đóng vai trò cung cấp cho bạn khả năng kiểm soát các property trong class theo nhu cầu của mình.

Như này, nếu bạn không sử dụng property class mà code ban đầu của bạn cho phép các instance truy cập trực tiếp vào **age** một cách tự do và gán nó mà không có kiểm soát, sau đó bạn thấy cần phải thêm **getter / setter** để kiểm soát việc gán và lấy ra **age** mà không sử dụng **property() class** thì code của những người khác sử dụng class Person của bạn sẽ **có thể** không còn hoạt động nữa, nhưng nếu bạn sử dụng **property() class** thì vẫn sẽ đảm bảo code của những người khác hoạt động một cách bình thường, hay có thể nói là có khả năng tương thích ngược, ví dụ lại, phần này tham khảo thôi, muốn hiểu thì hãy xem kỹ nhé ^^:

```
# Ban đầu
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(person.age) --> Output: 30

person.age = 20
print(person.age) --> Output: 20
--> vẫn đúng

# thêm getter / setter nhưng không dùng property() class:
class Person:
    def __init__(self, name, age):
        self.name = name
        self.set_age(age)

    def set_age(self, age):
        if age <= 0:
            raise ValueError('The age must be positive')
        self._age = age

    def get_age(self):
        return self._age

person = Person("Alice", 30)
print(person.get_age()) --> Output: 30

person.age = 20
print(person.get_age()) --> Output: 30
--> không đúng

person.set_age(20)
print(person.get_age()) --> Output: 20
--> cách set giá trị age đúng theo code mới sau khi thêm getter/setter

#bổ sung property() class:
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def set_age(self, age):
        if age <= 0:
            raise ValueError('The age must be positive')
        self._age = age

    def get_age(self):
        return self._age

    age = property(fget=get_age, fset=set_age)

person = Person("Alice", 30)
print(person.get_age()) --> Output: 30

person.age = 20
print(person.get_age()) --> Output: 20
--> đúng trở lại, code cũ vẫn hoạt động đúng
--> tính tương thích ngược

person.set_age(20)
print(person.get_age()) --> Output: 20
--> vẫn đúng
```

##### 3.2. **@property decorator**:

Sau phần trên, chúng ta đã biết property class là gì rồi đúng không ? Okey, đến với 1 đoạn code đơn giản để chúng ta làm quen **@property decorator** nhé:

```
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age

    def get_age(self):
        return self._age

    age = property(fget=get_age)

john = Person('John', 25)
print(john.age) --> 25
print(john.get_age()) --> 25

# hoặc có thể viết dưới dạng
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age

    @property
    def age(self):
        return self._age

john = Person('John', 25)
print(john.age) --> 25
```

Có thể hiểu **@property decorator** là một cách đánh dấu một phương thức thành 1 thuộc tính (thuộc tính ảo) mà bạn có thể truy cập bình thường. Thêm 1 ví dụ:

```
# thêm method set_age để gán giá trị cho _age thuộc lớp Person:
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age

    @property
    def age(self):
        return self._age

    def set_age(self, value):
        if value <= 0:
            raise ValueError('The age must be positive')
        self._age = value


# gán set_age cho fset của thuộc tính age, gọi method setter() của thuộc tính đối tượng age
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age

    @property
    def age(self):
        return self._age

    def set_age(self, value):
        if value <= 0:
            raise ValueError('The age must be positive')
        self._age = value

    age = age.setter(set_age)

# sử dụng @age.setter() để định nghĩa 1 setter cho thuộc tính age, setter này là method set_age():
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def set_age(self, value):
        if value <= 0:
            raise ValueError('The age must be positive')
        self._age = value

# thay đổi method set_age() thành method age() và sử dụng thuộc tính age trong __init__():
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value <= 0:
            raise ValueError('The age must be positive')
        self._age = value
# ---> lúc này thì person.age mà gán thì nó tương tự set_age(), còn gọi ra thì tương tự age.get_age()


john = Person('John', 25)
john.age = 10
print(john.age) --> 10
```

Khái quát lên (giống như công thức trong tiếng Anh ấy nhể 🤣🤣)

```
class MyClass:
    def __init__(self, attr):
        self.prop = attr

    @property
    def prop(self):
        return self.__attr

    @prop.setter
    def prop(self, value):
        self.__attr = value

# __atr là thuộc tính private, còn prop là tên thuộc tính
```

##### 3.3. **read-only property**:

Thuộc tính "chỉ đọc", nghe tiêu đề là hiểu liền đúng không 🤣🤣. Để xác định 1 read-only property thì chỉ cần xác định getter cho thuộc tính đó (thuộc tính area).

```
import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return math.pi * self.radius ** 2

c = Circle(10)
print(c.area)
```

Giờ thì tìm hiểu 1 cách nhỏ để cải thiện hiệu suất cho class nhé, đó là sử dụng tính toán giá trị thuộc tính chỉ độc bằng cache, lúc này khi giá trị radius thay đổi thì sẽ đặt lại giá trị \_are, còn area sẽ kiểm tra \_area nếu None thì tính toán lại, gán và trả về còn đã có thì trả về luôn:

```
import math

class Circle:
    def __init__(self, radius):
        self._radius = radius
        self._area = None

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError('Radius must be positive')

        if value != self._radius:
            self._radius = value
            self._area = None

    @property
    def area(self):
        if self._area is None:
            self._area = math.pi * self.radius ** 2

        return self._area
```

##### 3.4. **delete property**:

Xóa thuộc tính của 1 instance, 1 instance chứ không phải 1 class.

```
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if value.strip() == '':
            raise ValueError('name cannot be empty')
        self._name = value

    @name.deleter
    def name(self):
        del self._name

person = Person('John')
print(person.__dict__) --> {'_name': 'John'}

# xóa thuộc tính name của person
del person.name
print(person.__dict__) --> {}
print(person.name) --> error: AttributeError: 'Person' object has no attribute '_name'
```

Kết thúc phần này, oke chúng ta đã đi hiểu hơn vể property trong Python OOP rồi, nhớ là khởi đầu thôi, còn rất nhiều điều chúng ta chưa biết nên phải chủ động tìm tòi thêm nhá, có gì hay ho thì chia sẻ cùng mình chúng ta cùng nhau tốt lên, cảm ơn đã đọc. ^^

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
