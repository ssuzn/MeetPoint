import React from 'react';

function CategorySelector({ category, onChange }) {
    return (
        <select value={category} onChange={onChange}>
            <option value="FD6">식당</option>
            <option value="CE7">카페</option>
            <option value="CT1">문화시설</option>
            <option value="AT4">관광명소</option>
        </select>
    );
}

export default CategorySelector;