import React, { useState } from 'react';
import JSONPretty from 'react-json-pretty';

import { discreetToDuration, durationToDiscreet } from './pocTransformerLib';

const nowTs = Date.now();
const PoCTransformer = props => {
  const [discreetPoint, setDiscreetPoint] = useState({
    latitude: 32,
    longitude: 32,
    time: nowTs,
  });

  const [durationPoint, setDurationPoint] = useState({
    latitude: 32,
    longitude: 32,
    time: nowTs,
    durationMin: 5,
  });

  const [discreetList, setDiscreetList] = useState(
    props.path ? props.path : [],
  );
  const [durationList, setDurationList] = useState([]);

  const onChangeDiscreetLat = e => {
    setDiscreetPoint({ ...discreetPoint, latitude: Number(e.target.value) });
  };

  const onChangeDiscreetLng = e => {
    setDiscreetPoint({ ...discreetPoint, longitude: Number(e.target.value) });
  };

  const onChangeDiscreetTimeStamp = e => {
    setDiscreetPoint({ ...discreetPoint, time: parseInt(e.target.value) });
  };

  const onClickDiscreetAdd5 = () => {
    setDiscreetPoint({
      ...discreetPoint,
      time: discreetPoint.time + 5 * 60 * 1000,
    });
  };
  const onClickAddDiscreetPoint = () => {
    setDiscreetList([...discreetList, ...[discreetPoint]]);
  };

  const onClickDiscreetDelete = idx => {
    const arr = discreetList;
    arr.splice(idx, 1);
    setDiscreetList([...arr]);
  };

  const onChangeDurationLat = e => {
    setDurationPoint({ ...durationPoint, latitude: Number(e.target.value) });
  };

  const onChangeDurationLng = e => {
    setDurationPoint({ ...durationPoint, longitude: Number(e.target.value) });
  };

  const onChangeDurationTimeStamp = e => {
    setDurationPoint({ ...durationPoint, time: parseInt(e.target.value) });
  };

  const onClickDurationTSAdd5 = () => {
    setDurationPoint({
      ...durationPoint,
      time: durationPoint.time + 5 * 60 * 1000,
    });
  };
  const onClickDurationDurationAdd5 = () => {
    setDurationPoint({
      ...durationPoint,
      durationMin: durationPoint.durationMin + 5,
    });
  };
  const onClickAddDurationPoint = () => {
    setDurationList([...durationList, ...[durationPoint]]);
  };

  const onChangeDurationDuration = e => {
    setDurationPoint({ ...durationPoint, durationMin: Number(e.target.value) });
  };
  const onClickDurationDelete = idx => {
    const arr = durationList;
    arr.splice(idx, 1);
    setDurationList([...arr]);
  };

  const onClickDiscreetToDuration = () => {
    setDurationList([...discreetToDuration(discreetList)]);
  };

  const onClickDurationToDiscreet = () => {
    setDiscreetList([...durationToDiscreet(durationList)]);
  };

  const inputPoCStyle = { width: '300px', height: '200px', padding: '20px' };
  const outputPoCStyle = { padding: '20px' };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <div style={inputPoCStyle}>
                <p>Add Discreet Point</p>
                Lat:{' '}
                <input
                  onChange={onChangeDiscreetLat}
                  value={discreetPoint.latitude}
                ></input>
                <br></br>
                Lng:{' '}
                <input
                  onChange={onChangeDiscreetLng}
                  value={discreetPoint.longitude}
                ></input>
                <br></br>
                TS:{' '}
                <input
                  onChange={onChangeDiscreetTimeStamp}
                  value={discreetPoint.time}
                ></input>
                <button onClick={onClickDiscreetAdd5}>Add 5min</button>
                <br></br>
                <button onClick={onClickAddDiscreetPoint}>
                  Add Discreet Point
                </button>
              </div>

              <div style={outputPoCStyle}>
                Length: {discreetList.length}
                <br></br>
                {'['}
                {discreetList.map((el, idx) => (
                  <div key={idx}>
                    <button onClick={() => onClickDiscreetDelete(idx)}>
                      -
                    </button>
                    <JSONPretty data={el} />
                  </div>
                ))}
                {']'}
              </div>
            </td>
            <td style={{ verticalAlign: 'middle', padding: '20px' }}>
              <button onClick={onClickDiscreetToDuration}>→</button>
              <br></br>
              <button onClick={onClickDurationToDiscreet}>←</button>
            </td>
            <td>
              <div style={inputPoCStyle}>
                <p>Add Duration Point</p>
                Lat:{' '}
                <input
                  onChange={onChangeDurationLat}
                  value={durationPoint.latitude}
                ></input>
                <br></br>
                Lng:{' '}
                <input
                  onChange={onChangeDurationLng}
                  value={durationPoint.longitude}
                ></input>
                <br></br>
                TS:{' '}
                <input
                  onChange={onChangeDurationTimeStamp}
                  value={durationPoint.time}
                ></input>
                <button onClick={onClickDurationTSAdd5}>Add 5min</button>
                <br></br>
                Dur:{' '}
                <input
                  onChange={onChangeDurationDuration}
                  value={durationPoint.durationMin}
                ></input>
                <button onClick={onClickDurationDurationAdd5}>Add 5min</button>
                <br></br>
                <button onClick={onClickAddDurationPoint}>
                  Add Duration Point
                </button>
              </div>

              <div style={outputPoCStyle}>
                Length: {durationList.length}
                <br></br>
                {'['}
                {durationList.map((el, idx) => (
                  <div key={idx}>
                    <button onClick={() => onClickDurationDelete(idx)}>
                      -
                    </button>
                    <JSONPretty data={el} />
                  </div>
                ))}
                {']'}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PoCTransformer;
