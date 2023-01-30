namespace rest_api_v2.Utilities;

public static class StringUtil
{
    public static string GetStringAfterFirstSpace(string _string)
    {
        int indexOfSpace = _string.IndexOf(" ");

        if (indexOfSpace == -1)
        {
            return _string;
        }

        return _string.Substring(indexOfSpace + 1);
    }
}
