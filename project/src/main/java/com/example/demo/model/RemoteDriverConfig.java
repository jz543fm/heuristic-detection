package com.example.demo.model;

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

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

@org.springframework.stereotype.Controller
public class RemoteDriverConfig {

    private static final String REMOTE_URL = "";

    protected DesiredCapabilities desiredCapabilities;
    protected ChromeOptions chromeOptions;

    /**
     * Here web build the properties we need. Attention: the order matters!
     */
    public RemoteDriverConfig() {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\HP\\Downloads\\chromedriverX\\chromedriver.exe");
        buildChromeOptions();
        buildDesiredCapabilities();

    }


    public RemoteWebDriver buildRemoteDriver() {
        String remoteUrl = getRemoteUrl();

        if (remoteUrl == null) {
            remoteUrl = REMOTE_URL;
        }

        try {
            return createRemoteWebDriver(remoteUrl, desiredCapabilities);
        } catch (MalformedURLException e) {
            // TODO: add properly system logging
            System.out.println("Url for remote access is malformed. Please provide a valid URL.");
        }
        // should not happen.
        throw new RuntimeException("Remote Driver could not been build properly, because of an malformed remote url");
    }


    protected void buildChromeOptions() {
        ChromeOptions options = createCromeOptions();
        //System.setProperty("webdriver.chrome.driver","C:\\Users\\HP\\Downloads\\chromedriverX\\chromedriver.exe");

        this.chromeOptions = options;
    }


    protected void buildDesiredCapabilities() {
        chromeOptions.addExtensions(new File("C:\\Users\\HP\\Downloads\\DP\\Package.crx"));
        chromeOptions.addArguments("--auto-open-devtools-for-tabs");
        DesiredCapabilities capabilities = new DesiredCapabilities();

        capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
        WebDriver webDriver = new ChromeDriver(chromeOptions);

        ChromeDevToolsService devToolsService = DevToolsService.getDevToolsService(webDriver);

        // Get the Layers
        NetworkPerformance.getPerformanceMetrics(devToolsService);
        webDriver.get("http://www.cityfireprotection.co.uk/our-engineers;defacement;FALSE;0;Apache/2.2;PHP/5.3;\"text/html; charset=utf-8\";Sun");
        // Get the Layers
        LayerTree layers = LayerChange.enableLayers(devToolsService);


        // Wait for the layers for reset
        LayerChange.waitUntilLayerChanged(layers);

        // Reset the layers
        LayerChange.disableLayers(devToolsService);

        // get Platform from environment
        String strUrl = webDriver.getCurrentUrl();


        System.out.println("Current Url is:"+ strUrl);
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
        capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);

    }

    // ----------------- Just some helpful methods to make it more testable
    /**
     * Just for creating a ChromeOptions instance.
     */
    protected ChromeOptions createCromeOptions() {
        return new ChromeOptions();
    }

    /**
     * Just for creating a DesiredCapabilities instance.
     * @return
     */
    protected ChromeOptions createDesiredCapabilitiesForChrome() {
        return new ChromeOptions();
    }

    /**
     * Method for getting the remoteUrl from environment variable, if set.
     *
     * @return the RemoteDriver url for starting the RemoteSeleniumDriver with.
     */
    protected String getRemoteUrl() {
        return System.getenv("REMOTE_DRIVER_URL");
    }

    /**
     * Creating the RemoteWebDriver.
     */
    protected RemoteWebDriver createRemoteWebDriver(String remoteUrl, DesiredCapabilities desiredCapabilities) throws MalformedURLException {
        return new RemoteWebDriver(new URL(remoteUrl), desiredCapabilities);
    }

    /**
     * Builds a local driver for debugging issues.
     *
     * @return local driver with same configuration as remote driver
     */
    public ChromeDriver buildLocalDriver() {
        // it may be, that you must provide the path to the local driver here.
        //System.setProperty("webdriver.chrome.driver", "");
        return new ChromeDriver();
    }
}
