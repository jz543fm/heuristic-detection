package com.example.demo.model;

import com.opencsv.CSVReader;
import com.qeagle.devtools.protocol.commands.LayerTree;
import com.qeagle.devtools.services.ChromeDevToolsService;
import com.qeagle.devtools.utils.LayerChange;
import com.qeagle.devtools.utils.NetworkPerformance;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.qeagle.devtools.webdriver.DevToolsService;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@org.springframework.stereotype.Controller
public class RemoteDriverConfig {

    private static final String REMOTE_URL = "";
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");
    String formattedDate = sdf.format(date);
    protected DesiredCapabilities desiredCapabilities;
    protected ChromeOptions chromeOptions;

    /**
     * RemoteDriverConfig() builds ChromeDriver with ChromeOptions and DesiredCapabilities
     */
    public RemoteDriverConfig() throws ExecutionException, Exception {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\HP\\Downloads\\chromedriverX\\chromedriver.exe");
        buildChromeOptions();
        buildDesiredCapabilities();

    }
    /**
     * BuildChromeOptions() creates ChromeOptions
     */
    protected void buildChromeOptions(){
        ChromeOptions options = createCromeOptions();
        //System.setProperty("webdriver.chrome.driver","C:\\Users\\HP\\Downloads\\chromedriverX\\chromedriver.exe");
        this.chromeOptions = options;
    }

    /**
     * buildDesiredCapabilities() builds ChromeDriver with DesiredCapabilities
     */
    protected void buildDesiredCapabilities() throws IOException, InterruptedException {

//       List<String> c = data.get(98);
//        String c1= String.valueOf(data.get(2));
        System.out.print("dassdadsaadsa\n");
//        System.out.print(c);
//
//        List<String[]> r;
//        try (CSVReader reader = new CSVReader(new FileReader(file))) {
//            r = reader.readAll();
//        }
//
//        String[] str = new String[data.size()];
//
//        for (int i = 0; i < data.size(); i++) {
//            str[i] = String.valueOf(data.get(i));
//        }



        // Printing using for each loop

//        List<String> x = data.get(99);
//        String x2 = (x.toString());
//        System.out.print("XXXXXXXXXXXXXXXXXXxx\n");
//        System.out.print(x2);
        /**
         *  A file with the CRX file extension is a Chrome extension file used to extend the functionality of the Google Chrome
         *  web browser through programs that add additional features to the default browsing experience.
         */
        chromeOptions.addExtensions(new File("C:\\Users\\HP\\Downloads\\DP\\Extension.crx"));
        /**
         * Adds additional command line arguments to be used when starting Chrome. We need to use for testing purposes:
         * Chrome extensions argument --auto-open-devtools-for-tabs
         * Next examples are:
         * chromeOptions.addArguments("test-type");
         * chromeOptions.addArguments("start-maximized");
         * chromeOptions.addArguments("--window-size=1920,1080");
         * chromeOptions.addArguments("--enable-precise-memory-info");
         * chromeOptions.addArguments("--disable-popup-blocking");
         * chromeOptions.addArguments("--disable-default-apps");
         * chromeOptions.addArguments("test-type=browser");
         * chromeOptions.addArguments("headless");
         */
        chromeOptions.addArguments("--auto-open-devtools-for-tabs");
        /**
         * Get the actual version of ChromeDriver.
         */
        chromeOptions.getVersion();
        /**
         * Desired Capabilities is a class used to declare a set of basic requirements such as combinations
         * of browsers, operating systems, browser versions, etc. to perform automated cross browser testing
         * of a web application.
         */
        DesiredCapabilities capabilities = new DesiredCapabilities();
        /**
         * Sets the desired capabilities
         * @param String key
         * @param Object value
         */
        capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
        /**
         * Created new ArrayList<>(); data List<List<String>>
         */
        List<List<String>> data = new ArrayList<>();
        /**
         * File path for the CSV dataset of testing data
         */
        String file = "C:\\Users\\HP\\Downloads\\em.csv";
        /**
         * File path for the 2nd testing CSV dataset of testing data
         * String file = "C:\\Users\\HP\\Downloads\\em.csv";
         */
        /**
         * Creates a new FileReader
         */
        FileReader fr = new FileReader(file);
        /**
         * Creates a new BufferReader
         */
        BufferedReader br = new BufferedReader(fr);
        /**
         * Reading until we run out of lines
         */
        String line = br.readLine();
        while(line != null)
        {
            List<String> lineData = Arrays.asList(line.split(","));
            data.add(lineData);
            line = br.readLine();
        }
        /**
         * Creates a new webDriver = new ChromeDriver();
         * @param protected chromeOptions
         */
        WebDriver webDriver = new ChromeDriver(chromeOptions);
        /**
         * This invokes a devToolsService.
         */
        ChromeDevToolsService devToolsService = DevToolsService.getDevToolsService(webDriver);
        /**
         * Prints the fetched data
         */
        int count=0;
        for(List<String> list : data)
        {
            if(count==0){
                count++;
                continue;
            }
            /**
             * WebDriver counter++ and test elements in data set
             */
            webDriver.get(list.get(0));
            /**
             * TimeUnit.Seconds.sleep()
             * @param long timeout
             */
            TimeUnit.SECONDS.sleep(10);
            System.out.println();
            /**
             * Gets the current URL address.
             */
            String strUrl = webDriver.getCurrentUrl();
            System.out.println("The current tested URL entry is: "+count++);
            System.out.println( formattedDate +" "+ "The current tested URL is: " + strUrl);
        }
        /**
         *  Closes BufferInstance
         */
        br.close();

        /**
         * Creates a new ChromeDriver instance with specific options.
         */
//        WebDriver webDriver = new ChromeDriver(chromeOptions);

//        int listIndex = 0;
//        for (String[] arrays : r) {
//            System.out.println("\nString[" + listIndex++ + "] : " + Arrays.toString(arrays));
//
//            int index = 0;
//            for (String array : arrays) {
//                System.out.println(index++ + " : " + array);
//            }
//
//        }
        /**
         * Gets the web browser network performance.
         */
        NetworkPerformance.getPerformanceMetrics(devToolsService);
    //    webDriver.get(c.get(0));
//        webDriver.get("http://www.cityfireprotection.co.uk/our-engineers;defacement;FALSE;0;Apache/2.2;PHP/5.3;\"text/html; charset=utf-8\";Sun");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.sinduscongoias.com.br/index.html;defacement;FALSE;2474;Apache/2.2;;text/html;Sat");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.mariolas.gr/index.php/el/2010-04-28-18-37-43/2010-12-01-20-47-58.html;defacement;FALSE;0;Apache;;\"text/html; charset=utf-8\";Thu");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.goodvibes.fr/merrell-vigor-navy-p-661.html;phishing;FALSE;0;Apache/2.2;PHP/5.2;text/html;\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.bjcurio.com/ProductList.asp?lbid=62&xlbid=445;phishing;FALSE;26687;Microsoft-IIS/6.0;;text/html;\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.qinxin.cn/news/NewsShow.asp?TypeId=20080114;phishing;FALSE;9470;Microsoft-IIS/6.0;ASP.NET;text/html;\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://pastehtml.com/raw/1b8be47.html;phishing;FALSE;0;nginx/1.2;Phusion Passenger (mod_rails/mod_rack) 3.0;\"text/html; charset=utf-8\";\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.speyerseminar.de/cms/index.php?option=com_content&view=article&id=178&Itemid=290;defacement;FALSE;0;Apache/2.2;;\"text/html; charset=utf-8\";Tue\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.uniaoparaobem.com.br/index.php?option=com_alphacontent&ordering=1&letter=F&Itemid=57;defacement;FALSE;0;Apache;;\"text/html; charset=utf-8\";Fri\n");
//        TimeUnit.SECONDS.sleep(10);
//        webDriver.get("http://www.generalcustom.com.br/index.php?option=com_content&view=article&id=117&Itemid=92;defacement;FALSE;0;Apache/2.2;;\"text/html; charset=utf-8\";Tue\n");
        /**
         * Gets the web browser layer tree.
         */
        LayerTree layers = LayerChange.enableLayers(devToolsService);
        /**
         * Waits for the layer for resets.
         */
        LayerChange.waitUntilLayerChanged(layers);
        /**
         * Disables layers.
         */
        LayerChange.disableLayers(devToolsService);

        String platformString = System.getenv("PLATFORM");
        if (platformString == null) {
            platformString = Platform.WINDOWS.toString();
        }
        Platform platform = Platform.valueOf(platformString);
        capabilities.setCapability("platform", platform);

        // if chrome options are not build yet, we have to handle it
        if (chromeOptions == null) {
            buildChromeOptions();
        }
    }

    /**
     * Just for creating a ChromeOptions instance.
     */
    protected ChromeOptions createCromeOptions() {
        return new ChromeOptions();
    }

}
