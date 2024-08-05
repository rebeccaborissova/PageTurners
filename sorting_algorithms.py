def insertion_sort(books, left_score, right_score):
    for i in range(left_score + 1, right_score + 1):
        key_title = books[i]
        key_score = key_title.similarity_score
        j = i - 1

        # inner loop will not execute if subarray is already sorted
        while key_score > books[j].similarity_score and j >= left_score:
            books[j + 1] = books[j]
            j -= 1

        books[j + 1] = key_title


# Merge sort helper method for Tim sort
def merge(left_titles, right_titles):
    result_titles = []
    i = 0
    j = 0

    while i < len(left_titles) and j < len(right_titles):
        if left_titles[i].similarity_score < right_titles[j].similarity_score:
            result_titles.append(left_titles[i])
            i += 1
        else:
            result_titles.append(right_titles[j])
            j += 1

    result_titles = result_titles + left_titles[i:] + right_titles[j:]
    return result_titles


# Tim sort method
def tim_sort(book_list):
    # initialize run size
    run = 64

    list_length = len(book_list)

    for start in range(0, list_length, run):
        end = min(start + run - 1, list_length - 1)
        insertion_sort(book_list, start, end)

    size = run
    while size < list_length:
        for left in range(0, list_length, size * 2):
            midpoint = min(left + size - 1, list_length - 1)
            right = min(left + 2 * size - 1, list_length - 1)

            if midpoint < right:
                left_titles = book_list[left: midpoint + 1]
                right_titles = book_list[midpoint + 1: right + 1]

                titles_merged = merge(left_titles, right_titles)

                book_list[left: left + len(titles_merged)] = titles_merged

        size *= 2

def partition(book_list, low, high):
    # median-of-three pivot selection 
    mid = (low + high) // 2
    pivot_index = sorted([low, mid, high], key=lambda x: book_list[x].similarity_score)[1]
    pivot = book_list[pivot_index].similarity_score
    book_list[pivot_index], book_list[high] = book_list[high], book_list[pivot_index]  # Swap pivot with end
    i = low - 1

    for j in range(low, high):
        if book_list[j].similarity_score >= pivot:
            i += 1
            book_list[i], book_list[j] = book_list[j], book_list[i]

    # swap pivot with element at i + 1
    book_list[i + 1], book_list[high] = book_list[high], book_list[i + 1]

    return i + 1

def quick_sort(book_list, low, high):
    if low >= high:
        return

    pivot = partition(book_list, low, high)
    if pivot - low < high - pivot:
        quick_sort(book_list, low, pivot - 1)
        low = pivot + 1
    else:
        quick_sort(book_list, pivot + 1, high)
        high = pivot - 1