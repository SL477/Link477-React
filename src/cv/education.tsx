export class eductionCls {
  public schoolName: string;
  public subject: string;
  public date: string;

  constructor() {
    this.schoolName = '';
    this.subject = '';
    this.date = '';
  }
}

interface EductionProps {
  id: number;
  setEduction: CallableFunction;
  eduction: eductionCls;
}

export default function Education(props: EductionProps) {
  return (
    <>
      <h2>Education</h2>
      <label htmlFor={`schoolName${props.id}`}>
        School Name:
        <input
          type="text"
          id={`schoolName${props.id}`}
          name={`schoolName${props.id}`}
          className="form-control"
          value={props.eduction.schoolName}
          onChange={(e) =>
            props.setEduction({ ...props.eduction, schoolName: e.target.value })
          }
        />
      </label>
      <label htmlFor={`subject${props.id}`}>
        Subject:
        <input
          type="text"
          id={`subject${props.id}`}
          name={`subject${props.id}`}
          className="form-control"
          value={props.eduction.subject}
          onChange={(e) =>
            props.setEduction({ ...props.eduction, subject: e.target.value })
          }
        />
      </label>
      <label htmlFor={`date${props.id}`}>
        Date:
        <input
          type="date"
          id={`date${props.id}`}
          name={`date${props.id}`}
          className="form-control"
          value={props.eduction.date}
          onChange={(e) =>
            props.setEduction({ ...props.eduction, date: e.target.value })
          }
        />
      </label>
    </>
  );
}
