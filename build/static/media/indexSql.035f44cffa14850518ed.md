# Chỉ mục (Index) trong SQL - (Part 1).

_Đây không phải là 1 chủ để mới mẻ với các bạn Lập trình viên Backend đã có kinh nghiệm, nhưng là chủ để quan trọng khi các bạn lập trình phía backend. Hy vọng nó sẽ giúp đỡ các bạn mới có thể tìm được 1 điều gì đó phần này này, Cảm ơn đã ghé thăm😉😉😉_

<img src="https://codelearn.io/Upload/Blog/Index-Database-63734836761.1593.jpg"  width="100%" height="auto">

### 1. Tại sao phải có Index ?

Bạn sử dụng 1 framwork backend nào đó cộng với một hệ quản trị cơ sở dữ liệu quan hệ (MySQL, PostgreSQL, ...) để có thể tạo ra một bộ APIs nào đó, nó hoạt động bình thường. Nếu lúc đó là lúc bạn học hay mới làm quen nó thì trong cơ sở dữ liệu của bạn chưa quá nhiều bản ghi, lúc này thì tốc độ truy vấn vẫn nhanh, chưa có vấn đề gì.

Tuy nhiên, trên thực tế khi cơ sở dữ liệu của bạn trở nên quá lớn thì sao ? chắc chắn tốc độ query sẽ giảm đi đáng kể, đôi khi còn không thể query (Mình đã từng làm việc với những database lên tới 80m records, và việc query là điều tương đối bất khả thi). Lúc này bạn cần đến chỉ mục (Index) để có thể giải quyết vấn đề này.

### 2. Index là gì ?

Mình sẽ chích nguyên đoạn mình đọc được từ 1 [bài viết trên medium](https://medium.com/@kishlay.kumar/sql-indexing-why-is-it-important-836fe80837e6) của tác giả [Kishlay Kumar](https://medium.com/@kishlay.kumar):

> Indexes are special lookup tables that the database search engine can use to speed up data retrieval. Simply put, an index is a pointer to data in a table. An index in a database is very similar to an index in the back of a book.

Tạm thời có thể hiểu là: "Chỉ mục là các bảng đặc biệt tra cứu đặc biệt mà các hệ quản trị csdl sử dụng để tăng tốc độ query dữ liệu. Một cách đơn giản, nó là một con trỏ tới dữ liệu trong bảng. Chỉ mục giống như mục lục của một cuốn sách.".

Lấy ví dụ, bạn sử dụng Index (**B-Tree Index**) để tìm ra học sinh tên là "Nam" trong trường hợp bảng "Học sinh" của bạn chứa 1000 bản ghi chứa tên học sinh ("Thông", "Xuân", "Sơn", "Phúc", "Hiền", ...). Lúc này, Index sẽ được đánh từ 0-999 theo thứ tự Alphabet, (index=0 "An", index=1 "Anh", index=2 "Ánh", index=3 "Bình", ...). Bạn thực hiện câu truy vấn `Select ... where name = "Nam"` , lúc này, nó sẽ sử dụng phương pháp cưa đôi, ở index=499 name="Hoàng", so sánh thấy "Hoàng" < "Nam", vì vậy "Nam" nằm ở nửa sau của bảng Index. Tiếp tục như vậy cho đến khi tìm được chỉ mục trỏ tới bản ghi có name="Nam" (Có thể liên tưởng đến việc bạn tra từ điển, dễ hiểu hơn đúng không ?😀😀😀), thay vì phải lần lượt đi từng bản ghi một, chỉ cần so sánh (trong trường hợp này tối đa 10 lần).

Có nhiểu loại Index, có thể kể đến phổ biến nhất như **B-Tree Index**, **Hash Index**, ...

### 3. B-Tree Index:

Thông thường, khi nói đến Index mà không nhắc gì thêm thì mặc định là **B-Tree Index**, ở đây thì Index được tổ chức và lưu trữ dưới dạng cây, có root, branch, leaf (Chắc các bạn học qua cấu trúc dữ liệu sẽ không thấy mới, à lưu ý nó không phải Binary-Tree nhé, vì mỗi node có thể có nhiều hơn 2 lá).

<img src="https://www.researchgate.net/publication/320087056/figure/fig2/AS:543648787820544@1506627379532/B-tree-Index-over-the-Name-Attribute-of-the-Employee-Relation.png"  width="100%" height="auto">

Cú pháp:

```
// Create index
CREATE INDEX id_index ON table_name (column_name[, column_name…]) USING BTREE;
// Or
ALTER TABLE table_name ADD INDEX id_index (column_name[, column_name…])
//Drop index
DROP INDEX index_name ON table_name
```

Ở bài này, mình sẽ không đi quá sâu, chúng ta sẽ làm rõ ở một bài khác. Tuy nhiên vẫn phải nói đến những điểm quan trọng, đầu tiên, chúng ta có thể đánh Index cho nhiều trường.

OK, giờ sẽ đến phần quan trọng, khi bạn đánh Index cho nhiều trường (Ví dụ bảng của bạn lên đến 1 triệu bản ghi, ngoài **name** ra, chúng ta còn có trường **province** lưu thông tin tỉnh của học sinh đó, bạn sẽ đánh Index **lần lượt** cho trường **name** và **province**, nhớ **lần lượt** nhé). Vậy thì nên đánh trường nào trước ? Chà, nhớ lại ví dụ khi bạn tra từ điển nhé, nếu bạn có 1 lượng từ mới cực lớn bao gồm cả tiếng Anh, Pháp, Đức, Tây Ban Nha, ... đi, vậy chúng ta sẽ chia chúng vào các cuốn sách chứa mỗi từ không nhỉ ? Câu trả lời là **Không**, chả ai lại làm thế cả. Chúng ta sẽ chia chúng ra thành từ điển Anh, từ điển Pháp, từ điển Đức, ... và trong mỗi quyển chúng ta mới đánh mục lục theo ký tự alphabet, đúng không ? Vậy câu trả lời là chúng ta sẽ đánh lần lượt từ trường có ít giá trị unique hơn (VD, với ví dụ trên thì trong 1 lượng lớn từ mới, giả dụ mỗi bản ghi có các thông tin: 'word', 'mean', 'country' thì số lượng giá trị của 'country' sẽ ít hơn so với số lượng của 'word' đúng không, rõ ràng 😇😇😇, nên chúng ta đã chia các từ thành các quyển từ điển riêng theo 'country' đó, chứ không ai lại chia theo 'Từ điển từ **Hello**' cả). Trở lại với ví dụ bảng học sinh trên, chúng ta sẽ đánh Index lần lượt từ **province**, rồi đến **name**. (Tại sao, giờ nếu bạn muốn tìm học sinh tên 'Thông' ở 'Hà Nội', bạn sẽ tìm từ tỉnh trước, vì chỉ có 63 tỉnh nên sẽ nhanh hơn, sau đó tìm trong những học sinh ở 'Hà Nội' bạn tên 'Thông' sẽ nhanh hơn so với làm ngược lại đúng không ?) . Có thể hơi khó hiểu nhỉ, giờ hãy tưởng tượng 2 TH: bạn muốn tra 1 từ trong từ điển **word=hello** của **country=England**, bạn muốn tra theo kiểu 'Từ điển từ **Hello**', sau đó tìm đến từ có **country=England**, Hay sẽ tìm từ từ điển 'Từ điển Anh-Việt', sau đó tìm đến **word=hello** ?. Dễ hiểu hơn đúng không 🧐🧐🧐. Thôi, hãy tóm lại là khi đánh Index cho nhiều trường, chúng ta sẽ đánh từ trường có ít giá trị unique hơn, nhớ vậy.

**Nhưng, không phải luôn luôn, mà phải tùy theo nghiệp vụ hay truy vấn như thế nào, tần suất như thế nào, cái này thì phải tùy từng dự án**.

Thêm nữa, **B-Tree** được sử dụng trong các biểu thức so sánh dạng `=,>,<,>=,<=, BETWEEN, LIKE` --> tối ưu cho câu lệnh `ORDER BY`.

Khi truy vấn dữ liệu, csdl sẽ không scan toàn bộ dữ liệu trong bảng, mà sẽ tìm kiếm một cách **đệ quy** trong **B-Tree Index**, bắt đầu từ root, đến branch, leaf cho đến khi tìm được tất cả dữ liệu thỏa mãn thì dừng lại.

### 4. Hash Index:

Hash Index dựa trên giải thuật **Hash Function**, tương ứng với mỗi khối dữ liệu sẽ sinh ra một buckey (giá trị băm) để phân biệt.

Cú pháp

```
// Create index
CREATE INDEX id_index ON table_name (column_name[, column_name…]) USING HASH;
// Or
ALTER TABLE table_name ADD INDEX id_index (column_name[, column_name…]) USING HASH;
```

<img src="https://i1.wp.com/tech.vtijapan.co.jp/wp-content/uploads/2019/09/hU4Tc.png?w=945&ssl=1"  width="100%" height="auto">

Đầu tiên, **Hash table** là gì ? Hash table là một cấu trúc dữ liệu mà có thể map các cặp key-value dựa trên hash function để tính toán. **Hash Index** sử dụng Hash function để tính toán index vào một mảng các buckets, từ đó cải thiện tốc độ truy vấn. Hiểu đơn giản là sau khi được đánh Hash Index, ta sẽ có 1 Hash Table chứa các giá trị Index là kết quả của Hash Function khi truyển vào giá trị của trường được đánh và Value là con trỏ đến bản ghi. Khi thực hiện truy vấn, sử dụng Hash Function để tính toán giá trị Index, từ đó có được vị trí con trỏ của bản ghi cần lấy.

**Hash Index** chỉ nên sử dụng trong các biểu thức toán từ là **=, <>**, không sử dụng cho trường hợp tìm kiếm 1 khoảng các bản ghi. (Chắc đọc đoạn trên là hiểu lý do đúng không ? 🤣🤣).

Không thể tối ưu hóa **ORDER BY** bằng việc sử dụng **Hash Index** vì không thể tìm kiếm được phần tử tiếp theo trong ORDER.

**Hash Index** cung cấp tốc độ truy vấn nhanh hơn **B-Tree Index** trong những trường hợp cụ thể.

### 5. Notes:

Không phải mọi Hệ quản trị csdl đều hỗ trợ đủ các loại Index, nhưng với 2 loại Index trên, thì đa số đều hỗ trợ, ngoài **Hash Index**, **B-Tree Index** ra, còn có nhiều loại Index khác như **Full-text index**, **Spatial index**, **GIN index**, ... Các bạn tự tìm hiểu thêm nhé.

Ngoài ra, trên đây là trình bày dưới dạng mình hiểu, có thể nhiều bạn đọc chưa hiểu rõ thì các bạn góp ý giúp mình, tìm tòi thêm tài liệu để tự mình học thêm nhé, cảm ơn các bạn đã dành thời gian đọc bài viết của mình 😅😅😅.
