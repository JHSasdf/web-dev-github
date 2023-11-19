const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

function showPreview() {
    const files = filePickerElement.files;
    if (!files || files.length === 0) {
        imagePreviewElement.style.display = 'none';
        return;
    }

    const pickedFile = files[0]

    imagePreviewElement.src = URL.createObjectURL(pickedFile) // 파일을 가져와 이미지 소스로 사용할 수 있는 URL로 변환함.
    imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', showPreview)