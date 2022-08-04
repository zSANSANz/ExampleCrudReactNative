import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,TextInput, Button, TouchableOpacity } from 'react-native'
import axios from 'axios'

const LocalAPI = () => {
    const [semester, setSemester] = useState("");
    const [tahun_ajaran, setTahunAjaran] = useState("");
    const [semesters, setSemesters] = useState([]);
 
    useEffect(() => {
        getSemesters();
    }, []);

    const submit = () => {
        const newSemester = {
            semester: semester,
            tahun_ajaran: tahun_ajaran,
        };   

        axios.post('https://rumahbelajaribnuabbas-api.herokuapp.com/semesters/', newSemester)
            .then(res => console.log(res.data));

        setSemester("");
        setTahunAjaran("");
        getSemesters();
    } 

    const getSemesters = () => {
        axios.get('https://rumahbelajaribnuabbas-api.herokuapp.com/semesters/')
            .then(response => {
                const semesters = response.data.data;
                // console.log(semesters)
                // console.log(response)
                setSemesters(semesters)
            })
            .catch(function (error){
                console.log(error); 
            })  
    }

    const selectItem = (item) => {
        setSemester(item.semester);
        setTahunAjaran(item.tahun_ajaran);
    }

    return (
        <View style={styles.container}> 
            <Text style={styles.textTitle}>
                Rumah Belajar
            </Text>
            <Text>
                Form Semester
            </Text>
            <TextInput style={styles.input} placeholder="Semester" value={semester} onChangeText={(value) => setSemester(value) }/>
            <TextInput style={styles.input} placeholder="Tahun Ajaran" value={tahun_ajaran} onChangeText={(value) => setTahunAjaran(value) }/>
            <Button title="Simpan" onPress={submit}/>
            <View style={styles.line} />
            
            {
                semesters.map((data, i) => {
                    // console.log(data)
                    return (
                        <View key={i} style={styles.itemContainer}>
                            <Text style={styles.descName}>{data.semester}</Text>
                            <Text style={styles.descName}>{data.tahun_ajaran}</Text>
                            <Text style={styles.delete}>X</Text>
                            <TouchableOpacity onPress={() => selectItem(data)}>
                                <Text style={styles.update}>V</Text>
                            </TouchableOpacity>
                        </View>  
                    )
                })
            }
            
        </View>
    )
}

export default LocalAPI

const styles = StyleSheet.create({
    container: {padding: 20},
    textTitle: {textAlign: 'center', marginBottom:20},
    line: {height:2, backgroundColor: 'black', marginVertical: 2},
    input: {borderWidth: 1, marginBottom: 12, borderRadius: 25, paddingHorizontal: 18},
    itemContainer: {marginBottom:20},
    descName: {fontSize: 16},
    delete: {fontSize: 20, fontWeight: "bold", color: "red"},
    update: {fontSize: 20, fontWeight: "bold", color: "green"}
})