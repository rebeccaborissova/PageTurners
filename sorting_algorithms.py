# Merge sort algorithm implementation
def merge_sort(book_list, similarity_scores):
    if len(book_list) <= 1:
        return book_list, similarity_scores

    mid = len(book_list) // 2
    left_titles, left_scores = merge_sort(book_list[:mid], similarity_scores[:mid])
    right_titles, right_scores = merge_sort(book_list[mid:], similarity_scores[mid:])

    return merge(left_titles, right_titles, left_scores, right_scores)

def merge(left_titles, right_titles, left_scores, right_scores):
    result_titles = []
    result_scores = []
    i = 0
    j = 0

    while i < len(left_titles) and j < len(right_titles):
        if left_scores[i] > right_scores[j]:
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


# Example usage
if __name__ == "__main__":
    sample_books_list = ["The Hobbit", "The Lord of the Rings", "Harry Potter", "A Game of Thrones"]
    sample_scores = [0.8, 0.9, 0.7, 0.85]
    sorted_books, sorted_scores = merge_sort(sample_books_list, sample_scores)
    print("Merge Sort Sorted Books:", sorted_books)
    print("Merge Sort Sorted Scores:", sorted_scores)
    print()
    quick_sort(sample_books_list, sample_scores, 0, len(sample_books_list) - 1)
    print("Quick Sort Sorted Books:", sorted_books)
    print("Quick Sort Sorted Scores:", sorted_scores)

