export class workCls {
  name: string;
  title: string;
  responsibility: string;
  dateFrom: string;
  dateTo: string;
  constructor() {
    this.name = '';
    this.title = '';
    this.responsibility = '';
    this.dateFrom = '';
    this.dateTo = '';
  }
}

interface workProps {
  work: workCls;
  setWork: CallableFunction;
}

export default function Work(props: workProps) {
  return (
    <>
      <h2>Practical Experience</h2>
      <label htmlFor="workName">
        Company Name:
        <input
          type="text"
          id="workName"
          name="workName"
          className="form-control"
          value={props.work.name}
          onChange={(e) =>
            props.setWork({ ...props.work, name: e.target.value })
          }
        />
      </label>
      <label htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={props.work.title}
          onChange={(e) =>
            props.setWork({ ...props.work, title: e.target.value })
          }
        />
      </label>
      <label htmlFor="responsibility">
        Responsibilities:
        <textarea
          id="title"
          name="title"
          className="form-control"
          value={props.work.responsibility}
          onChange={(e) =>
            props.setWork({ ...props.work, responsibility: e.target.value })
          }
          rows={10}
        />
      </label>
      <label htmlFor="dateFrom">
        Date From:
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          className="form-control"
          value={props.work.dateFrom}
          onChange={(e) =>
            props.setWork({ ...props.work, dateFrom: e.target.value })
          }
        />
      </label>
      <label htmlFor="dateTo">
        Date To:
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          className="form-control"
          value={props.work.dateTo}
          onChange={(e) =>
            props.setWork({ ...props.work, dateTo: e.target.value })
          }
        />
      </label>
    </>
  );
}
