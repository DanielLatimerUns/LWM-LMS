using System.Globalization;

namespace LWM.Api;

public static class Extensions
{
    public static int YearWeek(this DateTime date)
    {
        var cal = new CultureInfo("en-Us").Calendar;
        return cal.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
    }
}