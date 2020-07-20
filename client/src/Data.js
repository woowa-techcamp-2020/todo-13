export function fetchCards() {
  return [
        { 
            "id": 1, 
            "author": "user1", 
            "last_updated": "2020-07-15 13:48:20", 
            "content": "페이지네이션 UI 리서치",
            "category": "해야할 일"
        },
        { 
            "id": 2, 
            "author": "user1", 
            "last_updated": "2020-07-15 13:51:20", 
            "content": "상세페이지 API 정리",
            "category": "해야할 일"
        },
        { 
            "id": 3, 
            "author": "user1", 
            "last_updated": "2020-07-15 16:20:20", 
            "content": "github 공부하기",
            "category": "해야할 일"
        },
        { 
            "id": 4, 
            "author": "user1", 
            "last_updated": "2020-07-15 10:02:20", 
            "content": "이번 주 기획 리뷰",
            "category": "하는 중"
        },
        { 
            "id": 5, 
            "author": "user1", 
            "last_updated": "2020-07-15 10:10:20", 
            "content": "MV* 패턴 스켈레톤 구현\n\t간단한 프로토타입",
            "category": "하는 중"
        },
        { 
            "id": 6, 
            "author": "user1", 
            "last_updated": "2020-07-15 10:06:20", 
            "content": "설정파일 분리 리팩토링 작업",
            "category": "다 했어"
        },
        { 
            "id": 7, 
            "author": "user1", 
            "last_updated": "2020-07-15 10:05:20", 
            "content": "데모 환경 설정",
            "category": "다 했어"
        }
    ];
}

export function fetchActivities() {
    return [
        {
            "username": "user1",
            "action": "move from 해야할 일 to 하는 중",
            "cardId": 3,
            "cardContent": "github 공부하기",
            "last_updated": "2020-07-15 16:20:20",
        },
        {
            "username": "user1",
            "action": "update",
            "cardId": 5,
            "cardContent": "MV* 패턴 스켈레톤 구현",
            "last_updated": "2020-07-15 10:10:20",
        },
        {
            "username": "user1",
            "action": "move",
            "cardId": 6,
            "cardContent": "설정파일 분리 리팩토링 작업",
            "last_updated": "2020-07-15 10:06:20",
        },
        {
            "username": "user1",
            "action": "add to 다 했어",
            "cardId": 7,
            "cardContent": "데모 환경 구성",
            "last_updated": "2020-07-15 10:05:20",
        },
        {
            "username": "user1",
            "action": "add to 하는 중",
            "cardId": 4,
            "cardContent": "이번 주 기획리뷰",
            "last_updated": "2020-07-15 10:02:20",
        },
        {
            "username": "user1",
            "action": "add to 하는 중",
            "cardId": 5,
            "cardContent": "MV* 패턴 스켈레톤 구현",
            "last_updated": "2020-07-15 10:00:20",
        },
    ];
}
