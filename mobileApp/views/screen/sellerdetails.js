import React, {useEffect, useState, useContext} from 'react';
import WeekView from 'react-native-week-view';
import axios from 'axios';
import {BuyerContext} from '../../context/buyerContext';
import ModalView from '../../component/modal/modal';

const SellerDetails = props => {
  const [appointments, setAppointments] = useState([]);
  const {buyer} = useContext(BuyerContext);
  const [showModal, setShowModal] = useState(false);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/buyers/appointments/:${props.route.params.data.email}`,
      )
      .then(res => {
        let replied = res.data;
        replied.forEach(
          (item, index) => (
            (item.startDate = new Date(item.startDate)),
            (item.endDate = new Date(item.endDate)),
            (item.color =
              item.email !== buyer.email
                ? 'red'
                : item.status == 'pending'
                ? 'blue'
                : item.status == 'approved'
                ? 'green'
                : '#810312'),
            (item.description =
              item.email !== buyer.email ? 'busy' : item.status),
            (item.key = index)
          ),
        );
        setAppointments(replied);
      })
      .catch(err => console.log(err));
  }, [props.route.params.data.email]);

  const book = (start, end, date) => {
    setShowModal(false)
    let startDate = date.setHours(start.split(':')[0]);
    startDate = date.setMinutes(start.split(':')[1]);
    let endDate = date.setHours(end.split(':')[0]);
    endDate = date.setMinutes(end.split(':')[1]);

    let Data = {
      name: buyer.name,
      email: buyer.email,
      sellerEmail: props.route.params.data.email,
      startDate: new Date(startDate).toUTCString(),
      endDate: new Date(endDate).toUTCString(),
      status:"pending"
    };
    axios
      .post('http://localhost:3001/buyers/addappointment/', {data: Data})
      .then(res => {
        let replied = res.data;
        replied.forEach(
          (item, index) => (
            (item.startDate = new Date(item.startDate)),
            (item.endDate = new Date(item.endDate)),
            (item.color =
              item.email !== buyer.email
                ? 'red'
                : item.status == 'pending'
                ? 'blue'
                : item.status == 'approved'
                ? 'green'
                : '#810312'),
            (item.description =
              item.email !== buyer.email ? 'busy' : item.status),
            (item.key = index)
          ),
        );
        setAppointments(replied);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      {showModal && <ModalView texts={texts} setShowModal={setShowModal} />}
      <WeekView
        events={appointments}
        numberOfDays={7}
        headerStyle={{
          backgroundColor: '#4286f4',
          color: '#fff',
          borderColor: '#fff',
        }}
        eventContainerStyle={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 3,
        }}
        startHour={8}
        timeStep={30}
        onGridClick={(pressEvent, startHour, date) => {
          setShowModal(true);
          setTexts({
            text: 'Book this slot',
            buttonText: 'Book',
            callback: book,
            date:date
          });
        }}
        onEventPress={e => {
          setShowModal(true);
          setTexts({text: e.status});
        }}
      />
    </>
  );
};

export default SellerDetails;
