import React, { useState } from "react";
import { DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";
import { useLazyGetNASAImagesQuery } from "../../services/nasa";
import { NASAImageCard } from "../NASAImageCard/NASAImageCard";
import { dateFormat, getCurrentDate } from "../../utils";
const { RangePicker } = DatePicker;

const NASAImages: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    getCurrentDate()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string>(
    getCurrentDate()
  );
  const [fetchTrigger, { data, isError, isLoading, isFetching }] =
    useLazyGetNASAImagesQuery();

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedStartDate(dateStrings[0]);
    setSelectedEndDate(dateStrings[1]);
  };

  const handleFormSubmit = () => {
    fetchTrigger({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  };

  if (isError) return <div>An error has occurred!</div>;
  return (
    <div>
      <h1>NASA Astronomy Picture of the Day</h1>
      <Space direction="vertical" size={12}>
        <RangePicker
          format={dateFormat}
          onChange={handleDateChange}
          defaultValue={[
            dayjs(getCurrentDate(), dateFormat),
            dayjs(getCurrentDate(), dateFormat),
          ]}
        />
        <Button type="primary" onClick={handleFormSubmit}>
          Show Images
        </Button>
      </Space>
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : data ? (
        data.map((imageData, index) => (
          <NASAImageCard index={index} imageData={imageData} />
        ))
      ) : null}
    </div>
  );
};

export default NASAImages;
