# Cùng học Python - Part 2: Classes và Objects.

_Hi, Chúng ta quay lại với Series cùng học Python nhé, ở phần trước chúng ta đã cùng tìm hiểu Kế thừa đơn và phần này sẽ tìm hiểu về Enumeration (liệt kê - đếm), cùng tham khảo và đóng góp thêm cho mình nhé. Cảm ơn đã ghé thăm😉😉😉_

<img src="https://www.ideamotive.co/hubfs/python%20vs%20javascript%201200x630.png"  width="80%" height="auto" margin="auto">

#### 5. Enumeration:

##### 5.1. **Enumeration**:

Enumeration là một tập hợp các thành phần có giá trị hằng số duy nhất. Ví dụ:

```
from enum import Enum

# đây là một enumeration
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

print(type(Color.RED)) --> <enum 'Color'>
print(isinstance(Color.RED, Color)) --> True
print(Color.RED.name) --> RED
print(Color.RED.value) --> 1

print(Color['RED']) --> Color.RED
print(Color(1)) --> Color.RED

for color in Color:
    print(color)

output: -->
Color.RED
Color.GREEN
Color.BLUE

print(list(Color)) --> [<Color.RED: 1>, <Color.GREEN: 2>, <Color.BLUE: 3>]

# tính bất biến
Color['YELLOW'] = 4 --> TypeError: 'EnumMeta' object does not support item assignment
Color.RED.value = 100 --> AttributeError: can't set attribute

# không thể kế thừa trừ khi không chứa element nào
class RGBA(RGB):
    ALPHA = 4

--> TypeError: Cannot extend enumerations

# Ví dụ thực tế chút nhé
from enum import Enum
import json

class ResponseStatus(Enum):
    PENDING = 'pending'
    FULFILLED = 'fulfilled'
    REJECTED = 'rejected'

# response from http request
response = '''{
    "status":"fulfilled"
}'''

data = json.loads(response)
status = data['status']

print(ResponseStatus(status)) --> PromiseStatus.FULFILLED

# nếu giá trị không thuộc enum đó thì sao ???
response = '''{
    "status":"ok"
}'''

data = json.loads(response)
status = data['status']

print(ResponseStatus(status)) --> ValueError: 'ok' is not a valid ResponseStatus
```

Tóm lại: Enumeration là một tập các element có giá trị bất biến. Tạo ra bằng cách kế thừa từ class **Enum**, các element phải cùng loại, Enumeration có thể lặp hoặc hash được.

##### 5.2. **Enum Aliases & @enum.unique**:

**Bí danh** và Decorator **@enum.unique**:

##### 5.3. **Customize and extend enumerations**:

##### 5.4. **auto**:

<img src="https://d1uxiwmpc9j4yg.cloudfront.net/images/all/1_AVnNrQx90p8zBxd1Q81FwA_1687787541.jpg"  width="100%" height="auto" margin="auto">

<!-- ### 5. Demo vài thuật toán với Python.

### 6. Virtual Environment và Pyenv. -->
