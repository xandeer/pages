;; Comments start with semicolons.
;;
;; Clojure is written in "forms", which are just
;; lists of things inside parentheses, separated by whitespace.
;;
;; The clojure reader assumes that the first thing is a
;; function or macro to call, and the rest are arguments.

;; The first call in a file should be ns, to set the namespace.
(ns learnclojure)

;; More basic examples:

;; str will create a string out of all its arguments
(str "Hello" " " "World") ; => "Hello World"

;; Equality is =
(= 1 1) ; true
(= 1 2) ; false

;; You need not for logic, too
(not true) ; false

;; Nesting forms works as you expect
(+ 1 (- 3 2)) ; 2

;;; Types
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Clojure uses Java's object types for booleans, strings and numbers.
;; Use `class` to inspect them.
(class 1)    ; Integer literals are java.lang.Long by default
(class 1.)   ; Float literals are java.lang.Double
(class "")   ; Strings always double-quoted, and are java.lang.String
(class true) ; Booleans are java.lang.Boolean
(class nil)  ; The "null" value is called nil

;; If you want to create a literal list of data, use ' to stop it from
;; being evaluated
'(+ 1 2) ; shorthand for (quote (+ 1 2))

;; You can eval a quoted list
(eval '(+ 1 2))

;;; Collections & Sequences
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Lists are linked-list data structures, while Vectors are array-backed.
;; Vectors and Lists are java classes too!
(class [1 2 3]) ; clojure.lang.PersistentVector
(class '(1 2 3)) ; clojure.lang.PersistentList

;; A list would be written as just (1 2 3), but we have to quote
;; it to stop the reader thinking it's a function.
;; Also, (list 1 2 3) is the same as '(1 2 3)

;; "Collections" are just groups of data
;; Both lists and vectors are collections:
(coll? '(1 2)) ; true
(coll? [1 2]) ; true

;; "Sequences" (seqs) are abstract descriptions of lists of data.
;; Only lists are seqs.
(seq? '(1 2)) ; true
(seq? [1 2]) ; false

;; A seq need only provide an entry when it is accessed.
;; So, seqs which can be lazy -- they can define infinite series:
(range 4) ; (0 1 2 3)
(range) ; (an infinite series)
(take 4 (range)) ; (0 1 2 3)

;; Use cons to add an item to the beginning of a list or vector
(cons 4 [1 2 3]) ; (4 1 2 3)
(cons 4 '(1 2 3)) ; (4 1 2 3)

;; Conj will add an item to a collection in the most efficient way.
;; For lists, they insert at the beginning.
;; For vectors, they insert at the end.
(conj [1 2] 3) ; [1 2 3]
(conj '(1 2) 3) ; (3 1 2)

;; Use concat to add lists or vectos together
(concat [1 2] '(3 4)) ; (1 2 3 4)

;; Use filter, map to interact with collections
(map inc [1 2 3]) ; (2 3 4)
(filter even? [1 2 3]) ; (2)

;; Use reduce to reduce them
(reduce + [1 2 3 4]) ; 10

;; Reduce can take an initial-value argument too
(reduce conj [] '(3 2 1)) ; [3 2 1]
(reduce + 5 [1 2 3 4]) ; 15

;;; Functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Use fn to create new functions. A function always returns
;; its last statement.
(fn [] "Hello World") ; #function[learnclojure/eval7325/fn--7326]

;; (You need extra parens to call it)
((fn [] "Hello World")) ; "Hello World"

;; You can create a var using def
(def x 1) ; #'learnclojure/x
x ; 1

;; Assign a function to a var
(def hello-world (fn [] "Hello World")) ; #'learnclojure/hello-world
(hello-world) ; "Hello World"

;; You can shorten this process by using defn
(defn hello-world [] "Hello World") ; #'learnclojure/hello-world

;; The [] is the list of arguments for the function.
(defn hello [name]
  (str "Hello " name)) ; #'learnclojure/hello
(hello "Alice") ; "Hello Alice"

;; You can also use this shorthand to create functions:
(def hello2 #(str "Hello " %1)) ; #'learnclojure/hello2
(hello2 "Julie") ; "Hello Julie"

;; You can have multi-variadic functions, too
(defn hello3
  ([] "Hello World")
  ([name] (str "Hello " name))) ; #'learnclojure/hello3
(hello3 "Joke") ; "Hello Joke"
(hello3) ; "Hello World"

;; Functions can pack extra arguments up in a seq for you
(defn count-args [& args]
  (str "You passed " (count args) " args: " args)) ; #'learnclojure/count-args
(count-args 1 2 3 "s" '()) ; "You passed 5 args: (1 2 3 \"s\" ())"

;; You can mix regular and packed arguments
(defn hello-count [name & args]
  (str "Hello " name ", you passed " (count args) " extra args")) ; #'learnclojure/hello-count
(hello-count "Fine" 1 2 3 "s" '()) ; "Hello Fine, you passed 5 extra args"

;;; Maps
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Hash maps and array maps share an interface. Hash maps have faster lookups
;; but don't retain key order.
(class {:a 1 :b 2 :c 3}) ; clojure.lang.PersistentArrayMap
(class (hash-map :a 1 :b 2 :c 3)) ; clojure.lang.PersistentHashMap

;; Arraymaps will automatically become hashmaps through most operations
;; if they get big enough, so you don't need to worry.

;; Maps can use any hashable type as a key, but usually keywords are best
;; Keywords are like strings with some efficiency bonuses
(class :a) ; clojure.lang.Keyword

(def stringmap {"a" 1, "b" 2, "c" 3}) ; #'learnclojure/stringmap
stringmap ; {"a" 1, "b" 2, "c" 3}

(def keymap {:a 1 :b 2 :c 3}) ; #'learnclojure/keymap
keymap ; {:a 1, :b 2, :c 3}

;; By the way, commas are always treated as whitespace and do nothing.

;; Retrieve a value from a map by calling it as a functions
(stringmap "a") ; 1
(keymap :a) ; 1

;; Keywords can be used to retrieve their value from a map, too!
(:b keymap) ; 2

;; Don't try this with strings.
;; ("a" stringmap) ; java.lang.String cannot be cast to clojure.lang.IFn

;; Retrieve a non-present key returns nil
(stringmap "d") ; nil

;; Use assoc to add new keys to hash-maps
(def newkeymap (assoc keymap :d 4)) ; #'learnclojure/newkeymap
newkeymap ; {:a 1, :b 2, :c 3, :d 4}

;; But remember, clojure types are immutable!
keymap ; {:a 1, :b 2, :c 3}

;; Use dissoc to remove keys
(dissoc keymap :a :b) ; {:c 3}

;;; Sets
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(class #{1 2 3}) ; clojure.lang.PersistentHashSet
(set [1 2 1 3 3 3 2]) ; #{1 3 2}

;; Add a member with conj
(conj #{1 2 3} 4) ; #{1 4 3 2}

;; Remove one with disj
(disj #{1 2 3} 1) ; #{3 2}

;; Text for existence by using the set as a function:
(#{1 2 3} 1) ; 1
(#{1 2 3} 4) ; nil

;; There are more functions in the clojure.sets namespace.
