# Cùng học Python - Part 2: Classes và Objects.

_Hi, Chúng ta quay lại với Series cùng học Python nhé, ở phần trước chúng ta đã xem lại phần Classes & Object và phần này sẽ là những Special Methods trong Python, cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

#### 2. Special methods:

##### 2.1. **\_\_str\_\_() method**:

\_\_str\_\_() là một phương thức đặc biệt, dùng để tùy chỉnh cách biểu diễn 1 instance dưới dạng string, không có gì đặc biệt cả 😂😂

```
class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __str__(self):
        return f'Person({self.first_name},{self.last_name},{self.age})'

person = Person('John', 'Doe', 25)
print(person) --> Person(John,Doe,25)

# nếu không có __str__:
person = Person('John', 'Doe', 25)
print(person) --> <__main__.Person object at 0x0000023CA16D13A0>
```

##### 2.2. **\_\_repr\_\_() method**:

\_\_repr**() là một phương thức đặc biệt, tương tự như \_\_str**(), khác biệt ở chỗ \_\_str**() sẽ trả về một chuỗi mà người dùng có thể đọc được, còn \_\_repr**() trả về chuỗi mà máy đọc được, khó hiểu nhỉ ? 🤣 nhớ là chúng khác nhau ở mục đích sử dụng, 1 cái để sử dụng để cung cấp 1 biểu diễn "thân thiện" với người dùng, còn 1 cái để sử dụng cho mục đích debug hoặc regenerative. Phần này mình nhớ vậy thui, trong các phần tới mình sẽ cố gắng đề cập đến qua các ví dụ.

```
class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __repr__(self):
        return f'Person("{self.first_name}","{self.last_name}",{self.age})'

person = Person("John", "Doe", 25)
print(repr(person)) --> Person("John","Doe",25)

# Hiển thị repr trong môi trường tương tác
person
# Output: Person("John","Doe",25)
```

##### 2.3. **\_\_eq\_\_() method**:

\_\_eq\_\_() là một phương thức dùng để so sánh 2 instance theo giá trị của chúng, Ví dụ:

```
class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __eq__(self, other):
        return self.age == other.age

john = Person('John', 'Doe', 25)
jane = Person('Jane', 'Doe', 25)

# nếu không có __eq__():
print(john is jane) --> False
print(john == jane) --> False

# nếu có __eq__():
print(john == jane) --> True

print(john == 20) --> AttributeError: 'int' object has no attribute 'age'

#================================================================
# Cập nhập kiểm tra xem đối tượng so sánh có phải là 1 instance của class trước khi so sánh:
class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def __eq__(self, other):
        if isinstance(other, Person):
            return self.age == other.age

        return False

print(john == 20) --> False
```

##### 2.4. **\_\_hash\_\_() method**:

\_\_hash**() là một phương thức nhận vào 1 Object và trả về giá trị hash dưới dạng số nguyên của đối tượng đó, sử dụng id của Object và \_\_eq**() sử dụng **is** để so sánh, mặc định thì khi implement \_\_eq**() thì Python sẽ tự động set \_\_hash**() thành None. Ví dụ:

```
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = Person('John', 22)
p2 = Person('Jane', 22)

print(hash(p1)) --> 110373112736
print(hash(p2)) --> 110373572343

# =================================================================
# nếu 1 class ghi đề phương thức **eq** thì các instance của class đó sẽ không **hash** được:
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        return isinstance(other, Person) and self.age == other.age

members = {
    Person('John', 22),
    Person('Jane', 22)
} --> TypeError: unhashable type: 'Person'
# Object Person mất hàm **hash** vì chỉ implement **eq**, **hash** sẽ đặt thành None.

hash(Person('John', 22)) --> TypeError: unhashable type: 'Person'

# =================================================================
# để class Person có thể hash được, cần implement \_\_hash__():
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        return isinstance(other, Person) and self.age == other.age

    def __hash__(self):
        return hash(self.age)
```

##### 2.5. **\_\_bool\_\_() method**:

\_\_bool\_\_() là một phương thức trả về các giá trị boolean cho các Object của 1 class. Ví dụ:

```
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __bool__(self):
        if self.age < 18 or self.age > 65:
            return False
        return True


person = Person('John', 25)
print(bool(person)) --> False

# =================================================================
class Payroll:
    def __init__(self, length):
        self.length = length

    def __len__(self):
        print('len was called...')
        return self.length


payroll = Payroll(0)
print(bool(payroll)) --> False

payroll.length = 10
print(bool(payroll)) --> True
```

- \_\_len**(): nếu trong class không có \_\_bool**(), Python sẽ tìm kiếm \_\_len**(), nếu \_\_len**() bằng 0 thì trả về False, không thì ngược lại thì True. Còn nếu không có cả 2 thì đối tượng sẽ trả về True theo mặc định.

##### 2.6. **\_\_del\_\_() method**:

\_\_del\_\_() là một phương thức dùng để hủy bỏ những Object không cần thiết trong Python. Python gọi **del()** ngay trước khi **garbage collector** hủy bỏ Object. Ví dụ:

```
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __del__(self):
        print('__del__ was called')


person = Person('John Doe', 23)
person = None
--> __del__ was called
# Khi đặt Object person về None, **garbage collector** sẽ hủy bỏ nó, **del** được gọi


person = Person('John Doe', 23)
del person
--> __del__ was called
```

- **garbage collector** sẽ hủy bỏ Object nếu không có tham chiếu đến Object đó.
- Không nên sử dụng **del()** để dọn dẹp tài nguyên mà nên sử dụng để xử lý context.

Thật ra phần này mình cũng chỉ đọc hiểu, hiểu cũng chưa kỹ nên các bạn chủ động tìm hiểu thêm nhá ^^. Hãy góp ý để chúng mình cũng nhau tốt lên.

##### 2.7. **Operator Overloading**:

Chúng ta cùng tìm hiểu về nạp chồng toán tử trong Python nhé, và sử dụng nó để làm cho các đối tượng có thể sử dụng các toán tử tích hợp sẵn. đến với 1 Ví dụ trước sau đó mình sẽ tổng hợp 1 bảng các toán tử nạp chồng sau nhé:

```
class Point2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f'({self.x},{self.y})'

    def __add__(self, point):
        if not isinstance(point, Point2D):
            raise ValueError('The other must be an instance of the Point2D')

        return Point2D(self.x + point.x, self.y + point.y)


a = Point2D(10, 20)
b = Point2D(15, 25)
c = a.add(b) --> (25,45)

# sử dụng toán tử:
c = a + b ~~~ c = a.add(b)
```

```
class Cart:
    def __init__(self):
        self.items = []

    def __iadd__(self, item):
        if not isinstance(item, Item):
            raise ValueError('The item must be an instance of Item')

        self.items.append(item)
        return self

    @property
    def total(self):
        return sum([item.amount for item in self.items])

    def __str__(self):
        if not self.items:
            return 'The cart is empty'

        return '\n'.join([str(item) for item in self.items])


cart = Cart()

cart += Item('Apple', 5, 2)
cart += Item('Banana', 20, 1)
cart += Item('Orange', 10, 1.5)

print(cart)
# print the total line
print('-' * 30)
print('Total: $', cart.total)

output----->
Apple   5       $2      $10
Banana  20      $1      $20
Orange  10      $1.5    $15.0
------------------------------
Total: $ 45.0
```

Toán tử và các phương thức đặc biệt của chúng:
| Operator | Special Methods |
| - | ---------------------- |
| + | \_\_add**(self, other) |
| - | \_\_sub**(self, other) |
| _ | \_\_mul**(self, other) |
| / | \_\_truediv**(self, other) |
| // | \_\_floordiv**(self, other) |
| % | \_\_mod**(self, other) |
| \*\* | \_\_pow**(self, other) |
| >> | \_\_rshift**(self, other) |
| << | \_\_lshift**(self, other) |
| & | \_\_and**(self, other) |
| \| | \_\_or**(self, other) |
| ^ | \_\_xor**(self, other) |
| += | \_\_iadd**(self, other) |
| -= | \_\_isub**(self, other) |
| _= | \_\_imul**(self, other) |
| /= | \_\_itruediv**(self, other) |
| //= | \_\_ifloordiv**(self, other) |
| %= | \_\_imod**(self, other) |
| \*\*= | \_\_ipow**(self, other) |
| >>= | \_\_irshift**(self, other) |
| <<= | \_\_ilshift**(self, other) |
| &= | \_\_iand**(self, other) |
| \|= | \_\_ior**(self, other) |
| ^= | \_\_ixor**(self, other) |

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
