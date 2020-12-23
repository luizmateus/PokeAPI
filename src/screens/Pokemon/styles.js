import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Stats = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const StatsView = styled.View`
  background: #3266af;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const StatsInfo = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const BaseStat = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

export const StatName = styled.Text`
  font-size: 13px;
  color: #fff;
  margin-top: 2px;
`;
