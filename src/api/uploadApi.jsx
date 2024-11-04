import customAxios from "./customAxios.jsx";


export const uploadServer =  async(formData) => {

    // Axios를 사용하여 파일 업로드를 진행합니다
    const res = await customAxios.post('http://localhost:8080/api/v1/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // 반드시 설정해야 합니다
            // 기타 필요한 헤더 설정 (예시)
            'Authorization': 'Bearer your_token', // 인증 토큰 설정
            // 다른 필요한 헤더들을 추가할 수 있습니다
        },
    })

    return res.data
}

export const deleteServerFile = async(fileName) => {

    const res = await customAxios.delete(`http://localhost:8080/api/v1/files/delete/${fileName}`)

    return res.data

}