import React from 'react';
import styled from 'styled-components';
import LocationInput from '../components/LocationInput';
import MidpointDisplay from '../components/MidpointDisplay';
import PlaceList from '../components/PlaceList';

import { ReactComponent as RestaurantIcon } from "../assets/restaurant.svg";
import { ReactComponent as CafeIcon } from "../assets/cafe.svg";
import { ReactComponent as CultureIcon } from "../assets/culture.svg";
import  { ReactComponent as TouristIcon } from "../assets/tourist.svg";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, addLocation, setSelectedCategory, getMidpointInfo } from '../redux/midPointSlice';
function MidFindPage() {
    const dispatch = useDispatch();
    const { locations, selectedCategory, midpoint, nearbyPlaces, status, error } = useSelector((state) => state.midpoint);

    // 위치 변경 핸들러
    const handleLocationChange = (index, newValue) => {
        dispatch(setLocation({ index, value: newValue }));
    };

    // 카테고리 선택 핸들러
    const handleCategorySelect = (categoryId) => {
        dispatch(setSelectedCategory(categoryId));
    };

    // 중간 지점 및 주변 장소 찾기
    const handleFindMidpointInfo = () => {
        dispatch(getMidpointInfo());
    };

    // input 추가 핸들러
    const handleAddLocation = () => {
        dispatch(addLocation());
    };

    const categories = [
        { id: 'FD6', name: '식당', icon: <RestaurantIcon /> },
        { id: 'CE7', name: '카페', icon: <CafeIcon /> },
        { id: 'CT1', name: '문화시설', icon: <CultureIcon /> },
        { id: 'AT4', name: '관광명소', icon: <TouristIcon /> },
      ];

    return (
    <React.Fragment>

        <SearchContainer>
            <FindTitle>📍 위치를 입력해주세요</FindTitle>

            <AddButtonBox>
                <AddButton onClick={handleAddLocation}>+</AddButton>
            </AddButtonBox>

            <SearchBox>
                <LocationInput 
                locations={locations}
                onLocationChange={handleLocationChange} />

            </SearchBox>

            <CategoryContainer>
                <Section1>
                    <CategoryTitle>
                        어떤 장소를 추천해드릴까요?
                    </CategoryTitle>
                    <CategoryButtonBox>
                        <CategoryButton
                            onClick={handleFindMidpointInfo}
                            disabled={status === "loading"}
                        >
                            검색
                        </CategoryButton>
                    </CategoryButtonBox>
                </Section1>    

                <CategoryBox>
                    <CategoryList>
                        {categories.map((category) => (
                            <Category
                                key={category.id}
                                onClick={() => {
                                    handleCategorySelect(category.id);
                                }}
                                selected={selectedCategory === category.id}>
                                    <CategoryIcon>
                                        {category.icon}
                                    </CategoryIcon>
                                    <CategoryName>
                                        {category.name}
                                    </CategoryName>
                                </Category>
                        ))}
                    </CategoryList>
                </CategoryBox>
            </CategoryContainer>
        </SearchContainer>


        {error && <p style={{ color: "red" }}>{error}</p>}
        {midpoint && <MidpointDisplay midpoint={midpoint} />}
        {nearbyPlaces.length > 0 && <PlaceList nearbyPlaces={nearbyPlaces} />}
    </React.Fragment>

  )
}

export default MidFindPage;

const SearchContainer = styled.div`
    border: 1px solid;
    border-radius: 16px;
    padding: 17px 19px;
`;

const FindTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #222225;
    margin-bottom: 0;
`;

const AddButtonBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
`;

const AddButton = styled.button`
    padding: 0 13px;
    border: none;
    border-radius: 8px;
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
    background: transparent;

    &:hover {
        background-color: #2222;
    }
`;

const SearchBox = styled.div`
    display: block;
    gap: 10px;
    position: relative;
    margin-bottom: 10px;
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Section1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
`;

const CategoryTitle = styled.h2`
    font-size: 20px;
    margin: 0;
`;

const CategoryButtonBox = styled.div`
    position: relative;
`;

const CategoryButton = styled.button`
    padding: 7px 18px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #2222;
    }
`;

const CategoryBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CategoryList = styled.ul`
    display: flex;
    flex: 1;
    padding: 0;
    list-style: none;
    border: 1px solid #e9e9ec;
    border-radius: 8px;
`;

const Category = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${(props) => (props.selected ? '#e9e9ec' : '#fff')};

    &:hover {
        background-color: #e9e9ec;
        color: #222225;
    }
`;

const CategoryIcon = styled.div`
    padding: 10px;
`;

const CategoryName = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin: auto;
`;