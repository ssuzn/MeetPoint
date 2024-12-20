// 밀리초 단위를 시간과 분으로 변환
export const formatDuration = (milliseconds) => {
    if (!milliseconds || milliseconds <= 0) return "정보를 가져올 수 없습니다.";
  
    // 밀리초를 초 단위로 변환
    const seconds = Math.ceil(milliseconds / 1000);
  
    const hours = Math.floor(seconds / 3600); // 시간
    const minutes = Math.ceil((seconds % 3600) / 60); // 분
  
    if (hours > 0 && minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${minutes}분`;
    }
  };