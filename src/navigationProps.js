export const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const defaultScreenOption = {
  headerBackTitleVisible: false,
  headerStyle: {
    height: 100,
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: 'black',
  },
  headerMode: 'screen',
};
