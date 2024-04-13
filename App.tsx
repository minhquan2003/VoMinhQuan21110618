import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function App(): React.JSX.Element {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const startStop = () => {
        setIsRunning(prevState => !prevState);
    };

    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const lap = () => {
        setLaps(prevLaps => [...prevLaps, time]);
    };

    const formatTime = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds},${
            milliseconds < 10 ? '0' : ''
        }${milliseconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>
            <View style={styles.middleContainer}>
            <TouchableOpacity style={styles.button} onPress={isRunning ? lap : reset}>
                <Text style={styles.buttonText}>{isRunning ? 'Reset' : 'Lap'}</Text>
            </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'green',}]} onPress={startStop}>
                    <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.bottomContainer}>
                {laps.map((lapTime, index) => (
                    <View key={index} style={styles.lapContainer}>
                        <Text style={styles.lapText}>Lap {index + 1}</Text>
                        <Text style={styles.lapText}>{formatTime(lapTime)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    middleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    bottomContainer: {
        flex: 6,
        width: '100%',
    },
    timerText: {
        fontSize: 80,
        color: 'white',
        fontWeight: '300',
    },
    button: {
        borderColor: 'white',
        borderRadius: 45,
        height: 70,
        width: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    buttonText: {
        color: 'black',
    },
    lapContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
    },
    lapText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
    },
});

export default App;
