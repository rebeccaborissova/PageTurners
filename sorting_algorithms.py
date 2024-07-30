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


# Example usage
if __name__ == "__main__":
    sample_books_list = ["The Hobbit", "The Lord of the Rings", "Harry Potter", "A Game of Thrones"]
    sample_scores = [0.8, 0.9, 0.7, 0.85]
    sorted_books, sorted_scores = merge_sort(sample_books_list, sample_scores)
    print("Merge Sort Sorted Books:", sorted_books)
    print("Merge Sort Sorted Scores:", sorted_scores)

