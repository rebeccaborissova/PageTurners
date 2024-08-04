from timeit import default_timer as timer

# Merge sort algorithm implementation
'''
def merge_sort(book_list, similarity_scores):
    if len(book_list) <= 1:
        return book_list, similarity_scores

    mid = len(book_list) // 2
    left_titles, left_scores = merge_sort(book_list[:mid], similarity_scores[:mid])
    right_titles, right_scores = merge_sort(book_list[mid:], similarity_scores[mid:])

    return merge(left_titles, right_titles, left_scores, right_scores)

'''

# Implementation of Tim Sort and Quick Sort in descending order to get the highest similarity score index as first element in list
# Insertion sort helper method for Tim sort (Tim sort combines insertion sort & merge function from merge sort)
def insertion_sort(book_list, similarity_scores, left_score, right_score):
    for i in range(left_score + 1, right_score + 1):
        key_title = book_list[i]
        key_score = similarity_scores[i]
        j = i - 1

        # inner loop will not execute if subarray is already sorted
        while key_score > similarity_scores[j] and j >= left_score:
            book_list[j + 1] = book_list[j]
            similarity_scores[j + 1] = similarity_scores[j]
            j -= 1

        book_list[j + 1] = key_title
        similarity_scores[j + 1] = key_score


# Merge sort helper method for Tim sort
def merge(left_titles, right_titles, left_scores, right_scores):
    result_titles = []
    result_scores = []
    i = 0
    j = 0

    while i < len(left_titles) and j < len(right_titles):
        if left_scores[i] < right_scores[j]:
            result_titles.append(left_titles[i])
            result_scores.append(left_scores[i])
            i += 1
        else:
            result_titles.append(right_titles[j])
            result_scores.append(right_scores[j])
            j += 1

    result_titles = result_titles + left_titles[i:] + right_titles[j:]
    result_scores = result_scores + left_scores[i:] + right_scores[j:]
    return result_titles, result_scores

# Tim sort method
def tim_sort(book_list, similarity_scores):
    # initialize run size
    run = 64

    list_length = len(book_list)

    for start in range(0, list_length, run):
        end = min(start + run - 1, list_length - 1)
        insertion_sort(book_list, similarity_scores, start, end)

    size = run
    while size < list_length:
        for left in range(0, list_length, size * 2):
            midpoint = min(left + size - 1, list_length - 1)
            right = min(left + 2 * size - 1, list_length - 1)

            if midpoint < right:
                left_titles = book_list[left : midpoint + 1]
                right_titles = book_list [midpoint + 1 : right + 1]
                left_scores = similarity_scores[left : midpoint + 1]
                right_scores = similarity_scores[midpoint + 1 : right + 1]

                titles_merged, scores_merged = merge(left_titles, right_titles, left_scores, right_scores)

                book_list[left : left + len(titles_merged)] = titles_merged
                similarity_scores[left : left + len(scores_merged)] = scores_merged

        size *= 2


# Quick sort algorithm implementation
def partition(book_list, similarity_scores, low, high):
    pivot = similarity_scores[high]
    i = low - 1                                             # Index of smaller element

    for j in range(low, high):
        if similarity_scores[j] >= pivot:
            i += 1
            book_list[i], book_list[j] = book_list[j], book_list[i]
            similarity_scores[i], similarity_scores[j] = similarity_scores[j], similarity_scores[i]

    # swap pivot with element at i + 1
    similarity_scores[i + 1], similarity_scores[high] = similarity_scores[high], similarity_scores[i + 1]
    book_list[i + 1], book_list[high] = book_list[high], book_list[i + 1]

    return i + 1


def quick_sort(book_list, similarity_scores, low, high):
    if low < high:
        pivot = partition(book_list, similarity_scores, low, high);
        quick_sort(book_list, similarity_scores, low, pivot - 1)
        quick_sort(book_list, similarity_scores, pivot + 1, high)


# Stackoverflow forum on timer in python
# https://stackoverflow.com/questions/62959658/actual-time-taken-by-an-algorithm-to-sort

def main():
    # Example lists to test tim and quick sort
    sample_books_list = ["The Hobbit", "The Lord of the Rings", "Harry Potter", "A Game of Thrones"]
    sample_scores = [0.8, 0.9, 0.7, 0.85]

    # Run tim sort with timer
    tim_sort_start = timer()
    tim_sort(sample_books_list, sample_scores)
    tim_sort_end = timer()
    print("Tim Sort Sorted Books: ", sample_books_list)
    print("Tim Sort Sorted Scores: ", sample_scores)
    tim_sort_execution_time = round((tim_sort_end - tim_sort_start)* 1e9, 0)
    print("Tim Sort Execution Time: ", tim_sort_execution_time, " nanoseconds")

    print()

    # Run quick sort with timer
    quick_sort_start = timer()
    quick_sort(sample_books_list, sample_scores, 0, len(sample_books_list) - 1)
    quick_sort_end = timer()
    print("Quick Sort Sorted Books:", sample_books_list)
    print("Quick Sort Sorted Scores:", sample_scores)
    quick_sort_execution_time = round((quick_sort_end - quick_sort_start) * 1e9, 0)
    print("Quick Sort Execution Time: ", quick_sort_execution_time, " nanoseconds")


if __name__ == "__main__":
    main()

