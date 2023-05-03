type AssignmentID = number
type AssignmentName = string
type AssignmentAddress = string

export interface IAssignment {
    assignment_id: AssignmentID
    name: AssignmentName
    address: AssignmentAddress
}