import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addThuChi, searchThuChi, statisticsThuChi } from '../redux/reducer/QLCTReducer';
import ModalComp from '../modal/ModalComp';
import { addThuChiAPI, deleteThuChiApi, updateThuChiAPI, fetchThuChis } from '../redux/action/QLTCActions';

const HomeScreens = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateThuChi, setDateThuChi] = useState('');
    const [catThuChi, setCatThuChi] = useState('');
    const [amountMoney, setAmountMoney] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dateError, setDateError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [amountError, setAmountError] = useState('');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const listThuChi = useSelector(state => state.listThuChi.filteredThuChi || state.listThuChi.listThuChi);
    const statistics = useSelector(state => state.listThuChi.statistics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchThuChis())
    }, [dispatch])

    useEffect(() => {
        dispatch(statisticsThuChi())
    }, [listThuChi])

    const handleAdd = () => {
        let error = false;

        if (title.length === 0) {
            setTitleError('Please enter title');
            error = true;
        } else {
            setTitleError('');
        }
        if (description.length === 0) {
            setDescriptionError('Please enter description');
            error = true;
        } else {
            setDescriptionError('');
        }

        if (dateThuChi.length === 0) {
            setDateError('Please enter date');
            error = true;
        } else {
            setDateError('');
        }

        if (catThuChi.length === 0) {
            setCategoryError('Please enter Category');
            error = true;
        } else if (catThuChi !== 'Thu' && catThuChi !== 'Chi') {
            setCategoryError('You just can enter Thu or Chi');
            error = true;
        } else {
            setCategoryError('');
        }

        if (amountMoney.length === 0) {
            setAmountError('Please enter amount money!');
            error = true;
        } else {
            setAmountError('');
        }

        if (!error) {
            let newThuChi = {
                id: Math.random().toString(),
                title: title,
                description: description,
                dateThuChi: dateThuChi,
                catThuChi: catThuChi,
                amountMoney: parseFloat(amountMoney)
            };
            dispatch(addThuChiAPI(newThuChi))
                .then(() => {
                    console.log('ThuChi add successfully!');
                }).catch((error) => {
                    console.error('Error add thu chi:', error);
                });
            setTitle('');
            setDescription('');
            setDateThuChi('');
            setCatThuChi('');
            setAmountMoney('');
            setShowAddModal(false);
        }

    }

    const handleDelete = (id) => {
        dispatch(deleteThuChiApi(id))
            .then(() => {
                console.log('deleted successfully');
            }).catch((error) => {
                console.log('Error deleting', error);
            })
        setShowDelModal(false);
    }

    const handleupdate = () => {
        let udThuChi = {
            id: selectedId,
            title: title,
            description: description,
            dateThuChi: dateThuChi,
            catThuChi: catThuChi,
            amountMoney: parseFloat(amountMoney)
        };
        dispatch(updateThuChiAPI({ id: selectedId, data: udThuChi }))
            .then(() => {
                console.log('Thu Chi update successfully!');
                setTitle('');
                setDescription('');
                setDateThuChi('');
                setCatThuChi('');
                setAmountMoney('');
                setShowUpdateModal(false);
            })
            .catch((error) => {
                console.error('Error update thu chi:', error);
            });

    }

    const handleSearch = () => {
        dispatch(searchThuChi(searchKeyword));
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(searchThuChi(searchKeyword));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchKeyword]);




    return (


        <View style={{ flex: 1, backgroundColor: '#D5D7F2' }}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', paddingRight: 20, borderWidth: 1, borderRadius: 10, alignSelf: 'center', marginVertical: 20, }}>
                <TextInput
                    placeholder='search your item here...'
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                    style={{ flex: 1, }}
                />
                <TouchableOpacity
                    onPress={handleSearch}>
                    <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>Search</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={listThuChi}
                style={{ marginBottom: 124 }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View key={item.id} style={{ margin: 10, paddingBottom: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }} >- {item.title}</Text>
                            <Text style={{ color: 'black', fontSize: 16, }} numberOfLines={2}>+ {item.description}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>+ {item.dateThuChi}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>+ {item.catThuChi}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>+ {item.amountMoney}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(item.amountMoney);
                                    setSelectedId(item.id);
                                    setTitle(item.title);
                                    setDescription(item.description);
                                    setDateThuChi(item.dateThuChi);
                                    setCatThuChi(item.catThuChi);
                                    setAmountMoney(item.amountMoney.toString());
                                    setShowUpdateModal(true);
                                }}
                                style={{ flex: 1, backgroundColor: '#8D92F2', marginHorizontal: 10, alignItems: 'center', paddingVertical: 10, borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDelModal(true);
                                    setSelectedId(item.id)
                                }}
                                style={{ flex: 1, backgroundColor: '#8D92F2', marginHorizontal: 10, alignItems: 'center', paddingVertical: 10, borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }
            />

            {/* **** */}
            <ModalComp
                modalTitle="Add New One"
                onClosePress={() => {
                    setShowAddModal(false)
                    setTitle('');
                    setDescription('');
                    setDateThuChi('');
                    setCatThuChi('');
                    setAmountMoney('');

                    setTitleError('');
                    setDescriptionError('');
                    setDateError('');
                    setCategoryError('');
                    setAmountError('');
                }}
                onSavePress={handleAdd}
                animationType='fade'
                transparent={true}
                visible={showAddModal}
                onRequestClose={() => setShowAddModal(!showAddModal)}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Date"
                        value={dateThuChi}
                        onChangeText={setDateThuChi}
                    />
                    {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={catThuChi}
                        onChangeText={setCatThuChi}
                    />
                    {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={amountMoney}
                        onChangeText={setAmountMoney}
                    />
                    {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
                </View>
            </ModalComp>
            
            {/* *** */}
            {/* *** */}
            <ModalComp
                modalTitle="Delete Item"
                onClosePress={() => setShowDelModal(false)}
                onSavePress={() => handleDelete(selectedId)}
                animationType='fade'
                transparent={true}
                visible={showDelModal}
                onRequestClose={() => setShowDelModal(!showDelModal)}>
                <Text style={{ alignSelf: 'center', marginVertical: 20, fontSize: 20, fontWeight: 'bold' }}>Are your sure to delete this item?</Text>
            </ModalComp>
            {/* *** */}
            {/* *** */}
            <ModalComp
                modalTitle="Update Item"
                onClosePress={() => {
                    setShowUpdateModal(false)
                    setTitle('');
                    setDescription('');
                    setDateThuChi('');
                    setCatThuChi('');
                    setAmountMoney('');
                }}
                onSavePress={handleupdate}
                animationType='fade'
                transparent={true}
                visible={showUpdateModal}
                onRequestClose={() => setShowUpdateModal(!showUpdateModal)}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Date"
                        value={dateThuChi}
                        onChangeText={setDateThuChi}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={catThuChi}
                        onChangeText={setCatThuChi}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={amountMoney}
                        onChangeText={setAmountMoney}
                    />
                </View>
            </ModalComp>
            {/* *** */}


            <View style={{ backgroundColor: '#8D92F2', width: 80, height: 80, borderRadius: 80, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 80, right: 10 }}>
                <TouchableOpacity onPress={() => setShowAddModal(true)}>
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>ADD</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 60,
                    alignSelf: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    position: 'absolute',
                    bottom: 0,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>Tổng Thu: {statistics.totalThu}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>Tổng Chi: {statistics.totalChi}</Text>
            </View>

        </View >
    )
}

export default HomeScreens

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        alignItems: 'center',
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
      },
      errorText: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
      },
})