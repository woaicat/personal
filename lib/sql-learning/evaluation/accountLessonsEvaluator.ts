import type { QueryResult, TaskEvaluation } from "@/lib/sql-learning/types";
import { matchesAccountProjection, matchesAccountSet, matchesOrderedValues } from "./resultMatchers";

const foundedIn1996 = ["Acme Corporation", "Scotfind", "Singletechno", "The New York Inquirer"];
const employeesBelow500 = ["Betasoloin", "Condax", "Dalttechnology", "Gogozoom", "Golddex", "Groovestreet", "Plusstrip", "Scottech", "Sumace", "Zathunicon", "Zencorporation"];
const revenueAtLeast5000 = ["Ganjaflex", "Hottechi", "Initech", "Kan-code", "Konex", "Scotfind", "Treequote", "Xx-holding"];
const founded2000To2005 = ["Bubba Gump", "Cancity", "Conecom", "Globex Corporation", "Goodsilron", "Green-Plus", "Groovestreet", "Isdom", "Kinnamplus", "Lexiqvolax", "Plexzap", "Plusstrip", "Plussunin", "Sumace", "Yearin"];

const medicalAccounts = ["Betasoloin", "Betatech", "Bioholding", "Bioplex", "Condax", "Isdom", "Labdrill", "Lexiqvolax", "Ron-tech", "Silis", "The New York Inquirer", "Zumgoity"];
const accountsStartingWithB = ["Betasoloin", "Betatech", "Bioholding", "Bioplex", "Blackzim", "Bluth Company", "Bubba Gump"];
const financeOrSoftware = ["Bubba Gump", "Codehow", "Dalttechnology", "Dontechi", "Finhigh", "Funholding", "Golddex", "Kan-code", "Opentech", "Scotfind", "Stanredtax", "Umbrella Corporation", "Vehement Capital Partners", "Xx-holding", "Zotware"];

export const selectEvaluation = {
  accounts: (result: QueryResult): TaskEvaluation => matchesAccountProjection(result, ["account"]),
  sectors: (result: QueryResult): TaskEvaluation => matchesAccountProjection(result, ["sector"]),
  accountAndLocation: (result: QueryResult): TaskEvaluation => matchesAccountProjection(result, ["account", "office_location"]),
  allAccountFields: (result: QueryResult): TaskEvaluation => matchesAccountProjection(result, ["account", "sector", "year_established", "revenue", "employees", "office_location", "subsidiary_of"]),
};

export const numericFilterEvaluation = {
  foundedIn1996: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, foundedIn1996),
  employeesBelow500: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, employeesBelow500),
  revenueAtLeast5000: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, revenueAtLeast5000),
  founded2000To2005: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, founded2000To2005),
};

export const textFilterEvaluation = {
  medical: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, medicalAccounts),
  kenya: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, ["Betatech"]),
  startsWithB: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, accountsStartingWithB),
  financeOrSoftware: (result: QueryResult): TaskEvaluation => matchesAccountSet(result, financeOrSoftware),
};

export const sortingEvaluation = {
  sectors: (result: QueryResult): TaskEvaluation => matchesOrderedValues(result, "sector", ["employment", "entertainment", "finance", "marketing", "medical", "retail", "services", "software", "technolgy", "telecommunications"]),
  newest: (result: QueryResult): TaskEvaluation => matchesOrderedValues(result, "account", ["Condax", "Dalttechnology", "Bioholding", "Scottech"]),
  firstFive: (result: QueryResult): TaskEvaluation => matchesOrderedValues(result, "account", ["Acme Corporation", "Betasoloin", "Betatech", "Bioholding", "Bioplex"]),
  nextFive: (result: QueryResult): TaskEvaluation => matchesOrderedValues(result, "account", ["Blackzim", "Bluth Company", "Bubba Gump", "Cancity", "Cheers"]),
};
